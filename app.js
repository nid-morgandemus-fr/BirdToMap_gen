// Variables globales
let map;
let squareLayer;
let marker;
let currentBaseMap = 'osm';
let squareSize = 2;
let scaleControl;
let squareGroup;
let listeningPoints = [];
let pointMarkers = [];
let currentMode = 'square';

const baseMaps = {
    osm: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }),
    topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap contributors',
        maxZoom: 17
    })
};

document.addEventListener('DOMContentLoaded', function() {
    initMap();
    document.getElementById('surveyDate').valueAsDate = new Date();
    document.getElementById('siteName').value = 'Forêt de Brocéliande';
    document.getElementById('observerName').value = 'Observateur Naturaliste';
});

function initMap() {
    map = L.map('map', {
        center: [46.603354, 1.888334],
        zoom: 8,
        layers: [baseMaps.osm]
    });

    // Contrôle d'échelle
    scaleControl = L.control.scale({
        imperial: false,
        metric: true,
        position: 'bottomright',
        maxWidth: 120
    }).addTo(map);

    // Barre de recherche (Geocoder)
    L.Control.geocoder({
        defaultMarkGeocode: false,
        position: 'topleft'
    })
    .on('markgeocode', function(e) {
        const latlng = e.geocode.center;
        map.setView(latlng, 14);
        if (window.searchMarker) {
            map.removeLayer(window.searchMarker);
        }
        window.searchMarker = L.marker(latlng).addTo(map);
        setTimeout(() => map.removeLayer(window.searchMarker), 5000);
    })
    .addTo(map);

    // Créer un groupe de calques pour le carré
    squareGroup = L.layerGroup().addTo(map);

    // Gestionnaire de clic selon le mode
    map.on('click', function(e) {
        if (currentMode === 'square') {
            placeSquare(e.latlng);
        } else if (currentMode === 'points') {
            addListeningPoint(e.latlng.lat, e.latlng.lng);
        }
    });

    placeSquare(map.getCenter());
}

function placeSquare(latlng) {
    // Supprimer tout le groupe et le recréer
    if (squareGroup) {
        map.removeLayer(squareGroup);
    }
    squareGroup = L.layerGroup();
    
    // Supprimer l'ancien marqueur
    if (marker) {
        map.removeLayer(marker);
    }

    // Calcul des dimensions du carré
    const sizeInDegreesLat = squareSize / 111;
    const sizeInDegreesLng = squareSize / (111 * Math.cos(latlng.lat * Math.PI / 180));
    
    const bounds = [
        [latlng.lat - sizeInDegreesLat/2, latlng.lng - sizeInDegreesLng/2],
        [latlng.lat + sizeInDegreesLat/2, latlng.lng + sizeInDegreesLng/2]
    ];

    // Créer le nouveau carré
    squareLayer = L.rectangle(bounds, {
        color: '#2d5016',
        weight: 4,
        fillOpacity: 0.2,
        fillColor: '#4a7c23',
        dashArray: null
    });
    
    // Ajouter au groupe
    squareGroup.addLayer(squareLayer);
    squareGroup.addTo(map);
    
    // Apporter au premier plan
    squareLayer.bringToFront();

    // Créer le nouveau marqueur
    marker = L.marker(latlng, { 
        draggable: true,
        zIndexOffset: 1000
    }).addTo(map);
    
    marker.on('dragend', function(e) {
        placeSquare(e.target.getLatLng());
    });

    // Mettre à jour l'affichage
    document.getElementById('centerCoords').innerHTML = 
        `${latlng.lat.toFixed(4)}°N, ${latlng.lng.toFixed(4)}°E`;
    
    const area = (squareSize * squareSize).toFixed(2);
    document.getElementById('squareArea').innerHTML = `${area} km²`;

    map.fitBounds(bounds, { padding: [50, 50] });
}

function changeBaseMap(type) {
    Object.values(baseMaps).forEach(layer => map.removeLayer(layer));
    map.addLayer(baseMaps[type]);
    currentBaseMap = type;

    document.querySelectorAll('.map-control-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if ((type === 'osm' && index === 0) || (type === 'topo' && index === 1)) {
            btn.classList.add('active');
        }
    });
    
    if (squareGroup) {
        squareGroup.bringToFront();
    }
}

function resetView() {
    if (squareLayer) {
        map.fitBounds(squareLayer.getBounds(), { padding: [50, 50] });
    }
}

function updateSquareSize() {
    const input = document.getElementById('squareSize');
    let val = parseFloat(input.value);
    if (isNaN(val) || val <= 0) val = 0.1;
    if (val > 50) val = 50;
    squareSize = val;
    if (marker) {
        placeSquare(marker.getLatLng());
    }
}

function openHelp() {
    window.open('https://github.com/nid-morgandemus-fr/BirdToMap_gen', '_blank');
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });
    
    const t = translations[currentLang];
    
    document.getElementById('loading').classList.add('active');
    
    try {
        await waitForTilesToLoad();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mapContainer = document.getElementById('mapContainer');
        
        // Masquer temporairement le carré Leaflet pour éviter le doublon
        if (squareLayer) {
            squareLayer.setStyle({ opacity: 0, fillOpacity: 0 });
        }
        
        // Capture de la carte
        const capturedCanvas = await html2canvas(mapContainer, {
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            imageTimeout: 15000,
            removeContainer: true
        });
        
        // Restaurer le carré Leaflet
        if (squareLayer) {
            squareLayer.setStyle({ opacity: 1, fillOpacity: 0.2 });
        }
        
        // Canvas composite
        const compositeCanvas = document.createElement('canvas');
        compositeCanvas.width = capturedCanvas.width;
        compositeCanvas.height = capturedCanvas.height;
        const ctx = compositeCanvas.getContext('2d');
        
        ctx.drawImage(capturedCanvas, 0, 0);
        
        const scale = 2;
        
        // Calcul des coordonnées du carré
        let centerLat, centerLng;
        if (marker) {
            centerLat = marker.getLatLng().lat;
            centerLng = marker.getLatLng().lng;
        } else {
            const mapCenter = map.getCenter();
            centerLat = mapCenter.lat;
            centerLng = mapCenter.lng;
        }
        
        const sizeInDegreesLat = squareSize / 111;
        const sizeInDegreesLng = squareSize / (111 * Math.cos(centerLat * Math.PI / 180));
        
        const northLat = centerLat + sizeInDegreesLat / 2;
        const southLat = centerLat - sizeInDegreesLat / 2;
        const westLng = centerLng - sizeInDegreesLng / 2;
        const eastLng = centerLng + sizeInDegreesLng / 2;
        
        const topLeftPoint = map.latLngToContainerPoint([northLat, westLng]);
        const bottomRightPoint = map.latLngToContainerPoint([southLat, eastLng]);
        
        const squareX = topLeftPoint.x * scale;
        const squareY = topLeftPoint.y * scale;
        const squareWidth = (bottomRightPoint.x - topLeftPoint.x) * scale;
        const squareHeight = (bottomRightPoint.y - topLeftPoint.y) * scale;
        
        // Dessiner le carré vert sur le canvas composite
        ctx.fillStyle = 'rgba(74, 124, 35, 0.25)';
        ctx.fillRect(squareX, squareY, squareWidth, squareHeight);
        
        ctx.strokeStyle = '#2d5016';
        ctx.lineWidth = 6;
        ctx.setLineDash([]);
        ctx.strokeRect(squareX, squareY, squareWidth, squareHeight);
        
        // Dessiner les points d'écoute
        listeningPoints.forEach((point, index) => {
            const pointLatLng = [point.lat, point.lng];
            const pointPixel = map.latLngToContainerPoint(pointLatLng);
            
            const markerX = pointPixel.x * scale;
            const markerY = pointPixel.y * scale;
            const pointNumber = index + 1;
            
            // Cercle rouge
            ctx.beginPath();
            ctx.arc(markerX, markerY, 16, 0, 2 * Math.PI);
            ctx.fillStyle = '#d32f2f';
            ctx.fill();
            
            // Bordure blanche
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.stroke();
            
            // Numéro blanc
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(pointNumber.toString(), markerX, markerY);
        });
        
        const mapImgData = compositeCanvas.toDataURL('image/png', 1.0);
        
        // PAGE 1 : En-tête et carte
        addHeader(doc, t);
        addSiteInfo(doc, t);
        doc.addImage(mapImgData, 'PNG', 20, 100, 170, 90);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`Carré: ${squareSize}km x ${squareSize}km | Centre: ${document.getElementById('centerCoords').textContent} | Surface: ${document.getElementById('squareArea').textContent}`, 105, 195, { align: 'center' });
        
        // PAGE 2 : Liste des points d'écoute (SI des points existent)
        if (listeningPoints.length > 0) {
            doc.addPage();
            addListeningPointsPage(doc, t);
        }
        
        // PAGE 3 : Tableau de terrain
        doc.addPage();
        addFieldTable(doc, t);
        
        // PAGE 4 : Guide
        doc.addPage();
        addGuidePage(doc, t);
        
        const siteName = document.getElementById('siteName').value.replace(/\s+/g, '_') || 'Protocole';
        const date = document.getElementById('surveyDate').value || new Date().toISOString().split('T')[0];
        doc.save(`Fiche_Terrain_${siteName}_${date}.pdf`);
        
    } catch (error) {
        console.error('Erreur PDF:', error);
        alert('Une erreur est survenue : ' + error.message);
    } finally {
        document.getElementById('loading').classList.remove('active');
    }
}

// Fonction corrigée pour la page des points d'écoute
function addListeningPointsPage(doc, t) {
    // Utiliser splitTextToSize pour éviter le dépassement
    const pageWidth = 210; // Largeur A4 en mm
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    
    // Titre
    doc.setFontSize(18);
    doc.setTextColor(45, 80, 22);
    doc.setFont(undefined, 'bold');
    const titleLines = doc.splitTextToSize(t.listeningPointsPage, maxWidth);
    doc.text(titleLines, pageWidth / 2, 20, { align: 'center' });
    
    // Introduction
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'normal');
    const introLines = doc.splitTextToSize(t.listeningPointsIntro, maxWidth);
    doc.text(introLines, pageWidth / 2, 30, { align: 'center' });
    
    // Calculer la position Y après l'introduction
    const introHeight = introLines.length * 5;
    const startY = 35 + introHeight;
    
    // Tableau des points
    const tableData = listeningPoints.map((point, index) => [
        (index + 1).toString(),
        `${point.lat.toFixed(5)}°N`,
        `${point.lng.toFixed(5)}°E`,
        `${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`
    ]);
    
    const headers = [
        currentLang === 'fr' ? 'N°' : currentLang === 'en' ? 'No.' : currentLang === 'de' ? 'Nr.' : '№',
        currentLang === 'fr' ? 'Latitude' : currentLang === 'en' ? 'Latitude' : currentLang === 'de' ? 'Breitengrad' : 'Широта',
        currentLang === 'fr' ? 'Longitude' : currentLang === 'en' ? 'Longitude' : currentLang === 'de' ? 'Längengrad' : 'Долгота',
        currentLang === 'fr' ? 'Coordonnées' : currentLang === 'en' ? 'Coordinates' : currentLang === 'de' ? 'Koordinaten' : 'Координаты'
    ];
    
    doc.autoTable({
        startY: startY,
        head: [headers],
        body: tableData,
        theme: 'grid',
        headStyles: { 
            fillColor: [74, 124, 35],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 10
        },
        styles: { 
            fontSize: 10,
            cellPadding: 3,
            lineColor: [200, 230, 201],
            lineWidth: 0.5
        },
        columnStyles: {
            0: { cellWidth: 20, halign: 'center' },
            1: { cellWidth: 50 },
            2: { cellWidth: 50 },
            3: { cellWidth: 70 }
        },
        margin: { top: startY, bottom: 20, left: margin, right: margin }
    });
    
    // Note en bas de page
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.setTextColor(74, 124, 35);
    const totalText = `${currentLang === 'fr' ? 'Total des points d\'écoute' : currentLang === 'en' ? 'Total listening points' : currentLang === 'de' ? 'Gesamte Hörpunkte' : 'Всего точек прослушивания'}: ${listeningPoints.length}`;
    doc.text(totalText, margin, finalY);
}

// Ajout de la page des points d'écoute
function addListeningPointsPage(doc, t) {
    doc.setFontSize(18);
    doc.setTextColor(45, 80, 22);
    doc.setFont(undefined, 'bold');
    doc.text(t.listeningPointsPage, 105, 20, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'normal');
    doc.text(t.listeningPointsIntro, 105, 30, { align: 'center' });
    
    // Tableau des points
    const tableData = listeningPoints.map((point, index) => [
        (index + 1).toString(),
        `${point.lat.toFixed(5)}°N`,
        `${point.lng.toFixed(5)}°E`,
        `${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`
    ]);
    
    doc.autoTable({
        startY: 40,
        head: [[currentLang === 'fr' ? 'N°' : currentLang === 'en' ? 'No.' : currentLang === 'de' ? 'Nr.' : '№', 
                currentLang === 'fr' ? 'Latitude' : currentLang === 'en' ? 'Latitude' : currentLang === 'de' ? 'Breitengrad' : 'Широта',
                currentLang === 'fr' ? 'Longitude' : currentLang === 'en' ? 'Longitude' : currentLang === 'de' ? 'Längengrad' : 'Долгота',
                currentLang === 'fr' ? 'Coordonnées' : currentLang === 'en' ? 'Coordinates' : currentLang === 'de' ? 'Koordinaten' : 'Координаты']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
            fillColor: [74, 124, 35],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 10
        },
        styles: { 
            fontSize: 10,
            cellPadding: 3,
            lineColor: [200, 230, 201],
            lineWidth: 0.5
        },
        columnStyles: {
            0: { cellWidth: 20, halign: 'center' },
            1: { cellWidth: 50 },
            2: { cellWidth: 50 },
            3: { cellWidth: 70 }
        },
        margin: { top: 40, bottom: 20 }
    });
    
    // Note en bas de page
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.setTextColor(74, 124, 35);
    doc.text(`${currentLang === 'fr' ? 'Total des points d\'écoute' : currentLang === 'en' ? 'Total listening points' : currentLang === 'de' ? 'Gesamte Hörpunkte' : 'Всего точек прослушивания'}: ${listeningPoints.length}`, 20, finalY);
}

// Fonction pour attendre que toutes les tuiles soient chargées
function waitForTilesToLoad() {
    return new Promise((resolve) => {
        const checkTiles = () => {
            const tiles = document.querySelectorAll('.leaflet-tile');
            if (tiles.length === 0) return false;
            
            let allLoaded = true;
            tiles.forEach(tile => {
                if (!tile.complete || tile.naturalWidth === 0) {
                    allLoaded = false;
                }
            });
            
            return allLoaded;
        };
        
        if (checkTiles()) {
            resolve();
            return;
        }
        
        // Attendre avec polling
        let attempts = 0;
        const maxAttempts = 100;
        const interval = setInterval(() => {
            attempts++;
            if (checkTiles() || attempts >= maxAttempts) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

// Fonction pour attendre que toutes les tuiles soient chargées
function waitForTilesToLoad() {
    return new Promise((resolve) => {
        const tiles = document.querySelectorAll('.leaflet-tile-loaded');
        if (tiles.length > 0) {
            resolve();
            return;
        }
        
        // Attendre que Leaflet charge les tuiles
        let checkCount = 0;
        const checkInterval = setInterval(() => {
            const loadedTiles = document.querySelectorAll('.leaflet-tile-loaded');
            if (loadedTiles.length > 0 || checkCount > 50) {
                clearInterval(checkInterval);
                resolve();
            }
            checkCount++;
        }, 100);
    });
}

function addHeader(doc, t) {
    doc.setFontSize(22);
    doc.setTextColor(45, 80, 22);
    doc.text(t.pdfTitle, 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(74, 124, 35);
    doc.text(t.pdfSubtitle, 105, 30, { align: 'center' });
    
    doc.setDrawColor(74, 124, 35);
    doc.setLineWidth(1.5);
    doc.line(20, 35, 190, 35);
}

function addSiteInfo(doc, t) {
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    const site = document.getElementById('siteName').value || 'Non spécifié';
    const observer = document.getElementById('observerName').value || 'Non spécifié';
    const date = document.getElementById('surveyDate').value || 'Non spécifié';
    const notes = document.getElementById('notes').value || 'Aucune note particulière.';
    
    let y = 50;
    doc.setFont(undefined, 'bold');
    doc.text(t.pdfSiteLabel, 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(site, 60, y);
    
    doc.setFont(undefined, 'bold');
    doc.text(t.pdfObserverLabel, 110, y);
    doc.setFont(undefined, 'normal');
    doc.text(observer, 145, y);
    y += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text(t.pdfDateLabel, 20, y);
    doc.setFont(undefined, 'normal');
    doc.text(date, 60, y);
    y += 15;
    
    doc.setFont(undefined, 'bold');
    doc.setTextColor(45, 80, 22);
    doc.text(t.pdfPrepNotesLabel, 20, y);
    y += 7;
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    
    const splitNotes = doc.splitTextToSize(notes, 170);
    doc.text(splitNotes, 20, y);
}

function addFieldTable(doc, t) {
    doc.setFontSize(16);
    doc.setTextColor(45, 80, 22);
    doc.setFont(undefined, 'bold');
    
    // Titre avec gestion des débordements
    const titleLines = doc.splitTextToSize(t.pdfTableTitle, 170);
    doc.text(titleLines, 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'normal');
    const subtitleLines = doc.splitTextToSize(t.pdfTableSubtitle, 170);
    doc.text(subtitleLines, 105, 28 + (titleLines.length - 1) * 5, { align: 'center' });
    
    const numRows = parseInt(document.getElementById('pdfLines').value) || 15;
    const blankRows = [];
    
    for (let i = 0; i < numRows; i++) {
        blankRows.push(['', '', '', '', '', '', '', '']);
    }
    
    doc.autoTable({
        startY: 40 + (titleLines.length - 1) * 5,
        head: [t.pdfTableHeaders],
        body: blankRows,
        theme: 'grid',
        headStyles: { 
            fillColor: [74, 124, 35],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 9,
            cellPadding: 3,
            halign: 'center',
            valign: 'middle'
        },
        styles: { 
            fontSize: 8,
            cellPadding: 2,
            lineColor: [200, 230, 201],
            lineWidth: 0.5,
            rowHeight: 12
        },
        columnStyles: {
            0: { cellWidth: 18, halign: 'center' },           // N° Point
            1: { cellWidth: 22, halign: 'center' },           // Heure début
            2: { cellWidth: 22, halign: 'center' },           // Heure fin
            3: { cellWidth: 35 },                             // Espèce
            4: { cellWidth: 16, halign: 'center' },           // Effectif
            5: { cellWidth: 28, halign: 'center' },           // Indice
            6: { cellWidth: 28 },                             // Milieu
            7: { cellWidth: 21, halign: 'center' }            // Certitude
        },
        margin: { top: 40, bottom: 15, left: 10, right: 10 }
    });
}

function addGuidePage(doc, t) {
    doc.setFontSize(16);
    doc.setTextColor(45, 80, 22);
    doc.setFont(undefined, 'bold');
    doc.text(t.pdfGuideTitle, 105, 20, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    let y = 40;
    t.pdfGuideSteps.forEach(line => {
        if (line === '') {
            y += 4;
        } else {
            const splitLine = doc.splitTextToSize(line, 170);
            doc.text(splitLine, 20, y);
            y += (splitLine.length * 6) + 2;
        }
    });
    
    doc.setFontSize(10);
    doc.setTextColor(74, 124, 35);
    doc.text(t.pdfGuideFooter1, 105, 280, { align: 'center' });
    doc.text(t.pdfGuideFooter2, 105, 286, { align: 'center' });
}

// Fonction pour ajouter un point d'écoute
function addListeningPoint(lat, lng) {
    const pointNumber = listeningPoints.length + 1;
    const point = {
        id: Date.now(), // ID unique
        number: pointNumber,
        lat: lat,
        lng: lng
    };
    
    listeningPoints.push(point);
    
    // Créer le marqueur personnalisé
    const marker = L.marker([lat, lng], {
        icon: L.divIcon({
            className: 'listening-point-marker',
            html: pointNumber,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        }),
        zIndexOffset: 2000 // Au-dessus du carré
    }).addTo(map);
    
    // Ajouter une info-bulle
    marker.bindPopup(`<b>${currentLang === 'fr' ? 'Point' : currentLang === 'en' ? 'Point' : currentLang === 'de' ? 'Punkt' : 'Точка'} ${pointNumber}</b><br>${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`);
    
    pointMarkers.push(marker);
    
    // Mettre à jour l'affichage de la liste
    updatePointsList();
}

// Fonction pour ajouter un point depuis les coordonnées saisies
function addPointFromCoords() {
    const latInput = document.getElementById('pointLat');
    const lngInput = document.getElementById('pointLng');
    
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
    
    if (isNaN(lat) || isNaN(lng)) {
        alert(currentLang === 'fr' ? 'Veuillez entrer des coordonnées valides' : 
              currentLang === 'en' ? 'Please enter valid coordinates' :
              currentLang === 'de' ? 'Bitte geben Sie gültige Koordinaten ein' :
              'Пожалуйста, введите действительные координаты');
        return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        alert(currentLang === 'fr' ? 'Coordonnées hors limites (Lat: -90 à 90, Lng: -180 à 180)' : 
              currentLang === 'en' ? 'Coordinates out of range (Lat: -90 to 90, Lng: -180 to 180)' :
              currentLang === 'de' ? 'Koordinaten außerhalb des Bereichs (Breite: -90 bis 90, Länge: -180 bis 180)' :
              'Координаты вне диапазона (Широта: -90 до 90, Долгота: -180 до 180)');
        return;
    }
    
    addListeningPoint(lat, lng);
    
    // Centrer la carte sur le nouveau point
    map.setView([lat, lng], 14);
    
    // Vider les champs
    latInput.value = '';
    lngInput.value = '';
}

// Fonction pour mettre à jour l'affichage de la liste des points
function updatePointsList() {
    const pointsList = document.getElementById('pointsList');
    
    if (listeningPoints.length === 0) {
        pointsList.innerHTML = `<div class="no-points" data-i18n="noPoints">Aucun point d'écoute défini</div>`;
        return;
    }
    
    let html = '';
    listeningPoints.forEach((point, index) => {
        html += `
            <div class="point-item">
                <div class="point-number">${point.number}</div>
                <div class="point-info">
                    <strong>${currentLang === 'fr' ? 'Point' : currentLang === 'en' ? 'Point' : currentLang === 'de' ? 'Punkt' : 'Точка'} ${point.number}</strong>
                    <div class="point-coords">${point.lat.toFixed(5)}°N, ${point.lng.toFixed(5)}°E</div>
                </div>
                <button class="point-delete" onclick="deleteListeningPoint(${point.id})" title="${currentLang === 'fr' ? 'Supprimer' : currentLang === 'en' ? 'Delete' : currentLang === 'de' ? 'Löschen' : 'Удалить'}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    pointsList.innerHTML = html;
}

// Fonction pour supprimer un point d'écoute
function deleteListeningPoint(pointId) {
    const index = listeningPoints.findIndex(p => p.id === pointId);
    if (index === -1) return;
    
    // Supprimer le marqueur de la carte
    const marker = pointMarkers[index];
    if (marker) {
        map.removeLayer(marker);
    }
    
    // Supprimer du tableau
    listeningPoints.splice(index, 1);
    pointMarkers.splice(index, 1);
    
    // Renuméroter les points restants
    listeningPoints.forEach((point, idx) => {
        point.number = idx + 1;
    });
    
    // Mettre à jour les marqueurs
    pointMarkers.forEach((marker, idx) => {
        const newNumber = idx + 1;
        marker.setIcon(L.divIcon({
            className: 'listening-point-marker',
            html: newNumber,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        }));
        marker.setPopupContent(`<b>${currentLang === 'fr' ? 'Point' : currentLang === 'en' ? 'Point' : currentLang === 'de' ? 'Punkt' : 'Точка'} ${newNumber}</b><br>${listeningPoints[idx].lat.toFixed(4)}°N, ${listeningPoints[idx].lng.toFixed(4)}°E`);
    });
    
    updatePointsList();
}

// Fonction pour basculer entre les modes
function setMapMode(mode) {
    currentMode = mode;
    
    const squareBtn = document.getElementById('modeSquareBtn');
    const pointsBtn = document.getElementById('modePointsBtn');
    const description = document.getElementById('modeDescription');
    const t = translations[currentLang];
    
    if (mode === 'square') {
        squareBtn.classList.add('active');
        pointsBtn.classList.remove('active');
        description.textContent = t.modeSquareDesc;
        description.setAttribute('data-i18n', 'modeSquareDesc');
        
        // Réactiver le drag du marqueur
        if (marker) {
            marker.dragging.enable();
        }
    } else if (mode === 'points') {
        pointsBtn.classList.add('active');
        squareBtn.classList.remove('active');
        description.textContent = t.modePointsDesc;
        description.setAttribute('data-i18n', 'modePointsDesc');
        
        // Désactiver le drag du marqueur pour éviter les conflits
        if (marker) {
            marker.dragging.disable();
        }
    }
}
// Fonction pour ajuster le nombre de lignes avec les boutons +/-
function adjustLines(delta) {
    const input = document.getElementById('pdfLines');
    let val = parseInt(input.value) || 15;
    val = Math.max(1, Math.min(100, val + delta));
    input.value = val;
}

// Fonction de validation du nombre de lignes
function validateLines() {
    const input = document.getElementById('pdfLines');
    let val = parseInt(input.value);
    
    if (isNaN(val) || val < 1) val = 1;
    if (val > 100) val = 100;
    
    input.value = val;
}
