const translations = {
    fr: {
        title: "Protocole amateur BirdToMap",
        subtitle: "Configuration de votre carré d'étude naturaliste",
        sessionConfig: "Configuration de la Session",
        mapInfo: "Cliquez sur la carte pour positionner le centre de votre carré d'étude.",
        siteName: "Nom du site / lieu-dit",
        sitePlaceholder: "Ex: Étang des Roseaux",
        observer: "Observateur (Amateur)",
        observerPlaceholder: "Votre nom",
        sessionDate: "Date de la session",
        squareDimension: "Dimension du côté du carré d'étude (km)",
        squareExample: "Ex: 1.5 pour un carré de 1,5 km × 1,5 km (2,25 km²)",
        centerCoords: "Coordonnées du centre",
        totalArea: "Surface totale",
        clickMap: "Cliquez sur la carte",
        pdfLines: "Nombre de lignes à imprimer dans la fiche PDF",
        shortSession: "10 lignes (session courte)",
        standardSession: "15 lignes (session standard)",
        longSession: "20 lignes (session longue)",
        fullDay: "30 lignes (journée complète)",
        pdfInfo: "Le tableau sera vierge dans le PDF pour un remplissage manuel sur le terrain.",
        prepNotes: "Notes générales de préparation",
        notesPlaceholder: "Matériel spécifique, accès au site, consignes personnelles...",
        exportTitle: "Export du Protocole",
        exportDesc: "Générez une fiche PDF complète incluant la carte, les infos du site et une page dédiée vierge pour vos relevés de terrain.",
        downloadPDF: "Télécharger la fiche PDF",
        naturalistTip: "Conseil naturaliste",
        naturalistText: "Imprimez le PDF généré. Utilisez-le sur le terrain pour noter les heures d'écoute et les indices. Vous pourrez ensuite dérusher les enregistrements audio sur ordinateur pour confirmer l'identification.",
        help: "Aide",
        generating: "Génération de votre fiche naturaliste...",
        listeningPoints: "Points d'écoute",
        listeningPointsDesc: "Cliquez sur la carte pour ajouter un point d'écoute, ou ajoutez-le manuellement ci-dessous.",
        latitude: "Latitude",
        longitude: "Longitude",
        addPoint: "Ajouter le point",
        noPoints: "Aucun point d'écoute défini",
        pointNumber: "Point",
        listeningPointsPage: "Liste des Points d'Écoute",
        listeningPointsIntro: "Voici la liste ordonnée des points d'écoute définis pour cette session. Chaque point est numéroté et positionné avec précision.",
        modeTitle: "Mode de la carte",
        modeSquare: "Déplacer le carré",
        modeSquareDesc: "Cliquez pour repositionner le centre du carré d'étude",
        modePoints: "Ajouter des points",
        modePointsDesc: "Cliquez pour ajouter un point d'écoute numéroté",
        pdfTitle: "Protocole Amateur d'Écoute Ornithologique",
        pdfSubtitle: "Fiche de préparation et de relevé naturaliste",
        pdfSiteLabel: "Site d'étude :",
        pdfObserverLabel: "Observateur :",
        pdfDateLabel: "Date :",
        pdfPrepNotesLabel: "Notes de préparation :",
        pdfTableTitle: "Fiche de Terrain - Relevé des Indices et Espèces",
        pdfTableSubtitle: "À remplir sur le terrain. L'identification certaine se fera ultérieurement par dérushage des enregistrements.",
        pdfTableHeaders: ["N° Point", "Heure début", "Heure fin", "Espèce (hypothèse)", "Effectif", "Indice (Chant/Cri/Vol)", "Milieu", "Certitude"],
        pdfGuideTitle: "Guide de l'Observateur Amateur",
        pdfGuideSteps: [
            "1. POSITIONNEMENT : Restez à l'intérieur du carré défini. Les points d'écoute doivent être répartis pour couvrir les différents habitats.",
            "2. SESSIONS D'ÉCOUTE : Privilégiez des sessions de 5 à 10 minutes par point. Notez l'heure exacte de début et de fin.",
            "3. ENREGISTREMENT : Utilisez un enregistreur audio ou un smartphone de qualité. Notez le numéro du fichier ou l'horaire précis dans la colonne 'Notes terrain'.",
            "4. IDENTIFICATION ULTÉRIEURE : Sur le terrain, notez vos hypothèses. L'identification 'certaine' sera validée plus tard à l'ordinateur en écoutant les enregistrements.",
            "5. NIVEAUX DE CERTITUDE :",
            "   - Certain : Identification visuelle claire ou chant typique sans ambiguïté.",
            "   - Probable : Chant entendu mais espèce proche possible, ou observation fugace.",
            "   - Possible : Cri d'alarme ou silhouette non déterminante, nécessitant une vérification audio.",
            "6. RESPECT DE LA FAUNE : Ne cherchez pas à faire chanter les oiseaux (pas de repasse), restez discret et respectez les zones de nidification."
        ],
        pdfGuideFooter1: "Ce protocole est conçu pour les naturalistes amateurs souhaitant structurer leurs observations",
        pdfGuideFooter2: "sans se substituer aux programmes de sciences participatives officiels."
    },
    en: {
        title: "Amateur BirdToMap protocol",
        subtitle: "Configure your naturalist study square",
        sessionConfig: "Session Configuration",
        mapInfo: "Click on the map to position the center of your study square.",
        siteName: "Site name / location",
        sitePlaceholder: "Ex: Reed Pond",
        observer: "Observer (Amateur)",
        observerPlaceholder: "Your name",
        sessionDate: "Session date",
        squareDimension: "Study square side dimension (km)",
        squareExample: "Ex: 1.5 for a 1.5 km × 1.5 km square (2.25 km²)",
        centerCoords: "Center coordinates",
        totalArea: "Total area",
        clickMap: "Click on the map",
        pdfLines: "Number of lines to print in PDF form",
        shortSession: "10 lines (short session)",
        standardSession: "15 lines (standard session)",
        longSession: "20 lines (long session)",
        fullDay: "30 lines (full day)",
        pdfInfo: "The table will be blank in the PDF for manual filling in the field.",
        prepNotes: "General preparation notes",
        notesPlaceholder: "Specific equipment, site access, personal instructions...",
        exportTitle: "Protocol Export",
        exportDesc: "Generate a complete PDF form including the map, site info and a blank dedicated page for your field notes.",
        downloadPDF: "Download PDF form",
        naturalistTip: "Naturalist tip",
        naturalistText: "Print the generated PDF. Use it in the field to note listening times and indices. You can then review audio recordings on computer to confirm species identification.",
        help: "Help",
        generating: "Generating your naturalist form...",
        listeningPoints: "Listening Points",
        listeningPointsDesc: "Click on the map to add a listening point, or add it manually below.",
        latitude: "Latitude",
        longitude: "Longitude",
        addPoint: "Add Point",
        noPoints: "No listening points defined",
        pointNumber: "Point",
        listeningPointsPage: "Listening Points List",
        listeningPointsIntro: "Here is the ordered list of listening points defined for this session. Each point is numbered and precisely positioned.",
        modeTitle: "Map Mode",
        modeSquare: "Move Square",
        modeSquareDesc: "Click to reposition the study square center",
        modePoints: "Add Points",
        modePointsDesc: "Click to add a numbered listening point",
        pdfTitle: "Amateur Ornithological Listening Protocol",
        pdfSubtitle: "Preparation and field recording form",
        pdfSiteLabel: "Study site:",
        pdfObserverLabel: "Observer:",
        pdfDateLabel: "Date:",
        pdfPrepNotesLabel: "Preparation notes:",
        pdfTableTitle: "Field Form - Index and Species Recording",
        pdfTableSubtitle: "To be filled in the field. Certain identification will be done later by reviewing recordings.",
        pdfTableHeaders: ["Point No.", "Start Time", "End Time", "Species (hypothesis)", "Count", "Index (Song/Call/Flight)", "Habitat", "Certainty"],
        pdfGuideTitle: "Amateur Observer Guide",
        pdfGuideSteps: [
            "1. POSITIONING: Stay inside the defined square. Listening points should be distributed to cover different habitats.",
            "2. LISTENING SESSIONS: Favor 5 to 10-minute sessions per point. Note the exact start and end time.",
            "3. RECORDING: Use a quality audio recorder or smartphone. Note the file number or exact time in the 'Field Notes' column.",
            "4. LATER IDENTIFICATION: In the field, note your species hypotheses. 'Certain' identification will be validated later on the computer by listening to recordings.",
            "5. CERTAINTY LEVELS:",
            "   - Certain: Clear visual identification or typical song without ambiguity.",
            "   - Probable: Song heard but similar species possible, or fleeting observation.",
            "   - Possible: Alarm call or non-determining silhouette, requiring audio verification.",
            "6. RESPECT FOR WILDLIFE: Do not try to make birds sing (no playback), stay discreet and respect nesting areas."
        ],
        pdfGuideFooter1: "This protocol is designed for amateur naturalists wishing to structure their observations",
        pdfGuideFooter2: "without substituting official participatory science programs."
    },
    de: {
        title: "Amateur BirdToMap protokoll",
        subtitle: "Konfigurieren Sie Ihr naturkundliches Studienquadrat",
        sessionConfig: "Sitzungskonfiguration",
        mapInfo: "Klicken Sie auf die Karte, um die Mitte Ihres Studienquadrats zu positionieren.",
        siteName: "Standortname / Ort",
        sitePlaceholder: "Bsp: Schilfteich",
        observer: "Beobachter (Amateur)",
        observerPlaceholder: "Ihr Name",
        sessionDate: "Sitzungsdatum",
        squareDimension: "Seitenlänge des Studienquadrats (km)",
        squareExample: "Bsp: 1,5 für ein 1,5 km × 1,5 km Quadrat (2,25 km²)",
        centerCoords: "Mittelkoordinaten",
        totalArea: "Gesamtfläche",
        clickMap: "Auf Karte klicken",
        pdfLines: "Anzahl der Zeilen im PDF-Formular drucken",
        shortSession: "10 Zeilen (kurze Sitzung)",
        standardSession: "15 Zeilen (Standardsitzung)",
        longSession: "20 Zeilen (lange Sitzung)",
        fullDay: "30 Zeilen (ganzer Tag)",
        pdfInfo: "Die Tabelle wird im PDF leer sein für manuelle Ausfüllung im Feld.",
        prepNotes: "Allgemeine Vorbereitungsnotizen",
        notesPlaceholder: "Spezifische Ausrüstung, Zugang zum Standort, persönliche Anweisungen...",
        exportTitle: "Protokoll-Export",
        exportDesc: "Generieren Sie ein vollständiges PDF-Formular einschließlich Karte, Standortinfo und einer leeren Seite für Ihre Feldnotizen.",
        downloadPDF: "PDF-Formular herunterladen",
        naturalistTip: "Naturkundlicher Tipp",
        naturalistText: "Drucken Sie das generierte PDF aus. Verwenden Sie es im Feld, um Hörzeiten und Hinweise zu notieren. Sie können dann Audioaufnahmen am Computer überprüfen.",
        help: "Hilfe",
        generating: "Ihr naturkundliches Formular wird generiert...",
        listeningPoints: "Hörpunkte",
        listeningPointsDesc: "Klicken Sie auf die Karte, um einen Hörpunkt hinzuzufügen, oder fügen Sie ihn manuell unten hinzu.",
        latitude: "Breitengrad",
        longitude: "Längengrad",
        addPoint: "Punkt hinzufügen",
        noPoints: "Keine Hörpunkte definiert",
        pointNumber: "Punkt",
        listeningPointsPage: "Liste der Hörpunkte",
        listeningPointsIntro: "Hier ist die geordnete Liste der für diese Sitzung definierten Hörpunkte. Jeder Punkt ist nummeriert und präzise positioniert.",
        modeTitle: "Kartenmodus",
        modeSquare: "Quadrat verschieben",
        modeSquareDesc: "Klicken, um die Mitte des Studienquadrats neu zu positionieren",
        modePoints: "Punkte hinzufügen",
        modePointsDesc: "Klicken, um einen nummerierten Hörpunkt hinzuzufügen",
        pdfTitle: "Amateur-Ornithologisches Hörprotokoll",
        pdfSubtitle: "Vorbereitungs- und Feldaufzeichnungsformular",
        pdfSiteLabel: "Studienstandort:",
        pdfObserverLabel: "Beobachter:",
        pdfDateLabel: "Datum:",
        pdfPrepNotesLabel: "Vorbereitungsnotizen:",
        pdfTableTitle: "Feldformular - Aufzeichnung von Indizes und Arten",
        pdfTableSubtitle: "Im Feld auszufüllen. Die sichere Bestimmung erfolgt später durch Überprüfung der Aufnahmen.",
        pdfTableHeaders: ["Punkt Nr.", "Startzeit", "Endzeit", "Art (Hypothese)", "Anzahl", "Hinweis (Gesang/Ruf/Flug)", "Lebensraum", "Sicherheit"],
        pdfGuideTitle: "Leitfaden für Amateurbeobachter",
        pdfGuideSteps: [
            "1. POSITIONIERUNG: Bleiben Sie innerhalb des definierten Quadrats. Hörpunkte sollten verteilt werden, um verschiedene Lebensräume abzudecken.",
            "2. HÖRSITZUNGEN: Bevorzugen Sie 5- bis 10-minütige Sitzungen pro Punkt. Notieren Sie die genaue Start- und Endzeit.",
            "3. AUFNAHME: Verwenden Sie ein qualitativ hochwertiges Audiogerät oder Smartphone. Notieren Sie die Dateinummer oder genaue Zeit in der Spalte 'Feldnotizen'.",
            "4. SPÄTERE BESTIMMUNG: Notieren Sie im Feld Ihre Arthypothesen. Die 'sichere' Bestimmung wird später am Computer durch Abhören der Aufnahmen validiert.",
            "5. SICHERHEITSNIVEAUS:",
            "   - Sicher: Klare visuelle Bestimmung oder typischer Gesang ohne Zweifel.",
            "   - Wahrscheinlich: Gesang gehört, aber ähnliche Art möglich, oder flüchtige Beobachtung.",
            "   - Möglich: Warnruf oder nicht bestimmende Silhouette, die eine Audioüberprüfung erfordert.",
            "6. RESPEKT VOR DER NATUR: Versuchen Sie nicht, Vögel zum Singen zu bringen (kein Playback), bleiben Sie diskret und respektieren Sie Nistgebiete."
        ],
        pdfGuideFooter1: "Dieses Protokoll ist für amateur-naturkundliche Beobachter konzipiert, die ihre Beobachtungen strukturieren möchten",
        pdfGuideFooter2: "ohne offizielle partizipative Wissenschaftsprogramme zu ersetzen."
    },
    ru: {
        title: "Протокол любительского прослушивания",
        subtitle: "Настройте ваш натуралистический исследовательский квадрат",
        sessionConfig: "Конфигурация сессии",
        mapInfo: "Нажмите на карту, чтобы разместить центр вашего исследовательского квадрата.",
        siteName: "Название места / локация",
        sitePlaceholder: "Пример: Пруд с камышами",
        observer: "Наблюдатель (Любитель)",
        observerPlaceholder: "Ваше имя",
        sessionDate: "Дата сессии",
        squareDimension: "Размер стороны квадрата (км)",
        squareExample: "Пример: 1.5 для квадрата 1,5 км × 1,5 км (2,25 км²)",
        centerCoords: "Координаты центра",
        totalArea: "Общая площадь",
        clickMap: "Нажмите на карту",
        pdfLines: "Количество строк для печати в PDF форме",
        shortSession: "10 строк (короткая сессия)",
        standardSession: "15 строк (стандартная сессия)",
        longSession: "20 строк (длинная сессия)",
        fullDay: "30 строк (полный день)",
        pdfInfo: "Таблица будет пустой в PDF для ручного заполнения в поле.",
        prepNotes: "Общие заметки по подготовке",
        notesPlaceholder: "Специфическое оборудование, доступ к месту, личные инструкции...",
        exportTitle: "Экспорт протокола",
        exportDesc: "Сгенерируйте полную PDF форму включая карту, информацию о месте и пустую страницу для ваших полевых заметок.",
        downloadPDF: "Скачать PDF форму",
        naturalistTip: "Совет натуралиста",
        naturalistText: "Распечатайте сгенерированный PDF. Используйте его в поле для записи времени прослушивания и индикаторов. Затем вы сможете прослушать аудиозаписи на компьютере.",
        help: "Помощь",
        generating: "Генерация вашей натуралистической формы...",
        listeningPoints: "Точки прослушивания",
        listeningPointsDesc: "Нажмите на карту, чтобы добавить точку прослушивания, или добавьте её вручную ниже.",
        latitude: "Широта",
        longitude: "Долгота",
        addPoint: "Добавить точку",
        noPoints: "Точки прослушивания не определены",
        pointNumber: "Точка",
        listeningPointsPage: "Список точек прослушивания",
        listeningPointsIntro: "Вот упорядоченный список точек прослушивания, определённых для этой сессии. Каждая точка пронумерована и точно размещена.",
        modeTitle: "Режим карты",
        modeSquare: "Переместить квадрат",
        modeSquareDesc: "Нажмите, чтобы переместить центр исследовательского квадрата",
        modePoints: "Добавить точки",
        modePointsDesc: "Нажмите, чтобы добавить пронумерованную точку прослушивания",
        pdfTitle: "Протокол любительского орнитологического прослушивания",
        pdfSubtitle: "Форма подготовки и полевой регистрации",
        pdfSiteLabel: "Место исследования:",
        pdfObserverLabel: "Наблюдатель:",
        pdfDateLabel: "Дата:",
        pdfPrepNotesLabel: "Заметки по подготовке:",
        pdfTableTitle: "Полевая форма - Регистрация индикаторов и видов",
        pdfTableSubtitle: "Заполняется в поле. Точная идентификация будет проведена позже при прослушивании записей.",
        pdfTableHeaders: ["№ Точки", "Время начала", "Время конца", "Вид (гипотеза)", "Кол-во", "Индикатор (Пение/Крик/Полет)", "Среда", "Уверенность"],
        pdfGuideTitle: "Руководство для наблюдателя-любителя",
        pdfGuideSteps: [
            "1. ПОЗИЦИОНИРОВАНИЕ: Оставайтесь внутри определенного квадрата. Точки прослушивания должны быть распределены для охвата различных местообитаний.",
            "2. СЕССИИ ПРОСЛУШИВАНИЯ: Отдавайте предпочтение сессиям по 5-10 минут на точку. Записывайте точное время начала и конца.",
            "3. ЗАПИСЬ: Используйте качественный диктофон или смартфон. Запишите номер файла или точное время в столбце 'Полевые заметки'.",
            "4. ПОСЛЕДУЮЩАЯ ИДЕНТИФИКАЦИЯ: В поле записывайте свои гипотезы о видах. 'Точная' идентификация будет подтверждена позже на компьютере при прослушивании записей.",
            "5. УРОВНИ УВЕРЕННОСТИ:",
            "   - Точно: Четкая визуальная идентификация или типичное пение без двусмысленности.",
            "   - Вероятно: Слышно пение, но возможен похожий вид, или мимолетное наблюдение.",
            "   - Возможно: Сигнал тревоги или неопределяющий силуэт, требующий аудиопроверки.",
            "6. УВАЖЕНИЕ К ПРИРОДЕ: Не пытайтесь заставить птиц петь (без воспроизведения), оставайтесь незаметным и уважайте зоны гнездования."
        ],
        pdfGuideFooter1: "Этот протокол разработан для натуралистов-любителей, желающих структурировать свои наблюдения",
        pdfGuideFooter2: "не подменяя официальные программы гражданской науки."
    }
};

let currentLang = 'fr';

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Mise à jour de tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', t[key]);
                }
            } else {
                element.textContent = t[key];
            }
        }
    });
    
    // Mise à jour de la description du mode actif
    const description = document.getElementById('modeDescription');
    if (description) {
        if (currentMode === 'square') {
            description.textContent = t.modeSquareDesc;
        } else if (currentMode === 'points') {
            description.textContent = t.modePointsDesc;
        }
    }
    
    // Sauvegarde de la préférence
    localStorage.setItem('preferredLang', lang);
    
    // Mise à jour des boutons de langue actifs
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(lang)) {
            btn.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'fr';
    changeLanguage(savedLang);
});
