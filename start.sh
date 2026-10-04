#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Se placer automatiquement dans le répertoire où se trouve ce script
cd "$(dirname "$0")" || exit

# 2. Configuration du port
PORT=8000

echo ""
echo "==================================================="
echo "  Serveur Local"
echo "==================================================="
echo ""

# 3. Vérifier si Python 3 est disponible
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}ERREUR : Python 3 n'est pas installé ou n'est pas dans le PATH.${NC}"
    echo "Veuillez installer Python 3 (ex: sudo apt install python3 sur Debian/Ubuntu)"
    echo ""
    read -p "Appuyez sur Entrée pour quitter..."
    exit 1
fi

# 4. Afficher la version de Python
PYTHON_VERSION=$(python3 --version)
echo -e "${GREEN}[OK]${NC} $PYTHON_VERSION détecté"

# 5. Détecter le système d'exploitation pour ouvrir le navigateur
detect_os() {
    case "$OSTYPE" in
        linux-gnu*)
            echo "linux"
            ;;
        darwin*)
            echo "macos"
            ;;
        *)
            echo "unknown"
            ;;
    esac
}

OS=$(detect_os)

# 6. Ouvrir le navigateur par défaut
echo -e "${YELLOW}[INFO]${NC} Ouverture du navigateur sur http://localhost:$PORT ..."

case "$OS" in
    linux)
        # Essayer xdg-open (standard sur la plupart des distributions Linux)
        if command -v xdg-open &> /dev/null; then
            xdg-open "http://localhost:$PORT" &
        elif command -v sensible-browser &> /dev/null; then
            sensible-browser "http://localhost:$PORT" &
        else
            echo -e "${YELLOW}[WARN]${NC} Aucun navigateur par défaut détecté. Ouvrez manuellement : http://localhost:$PORT"
        fi
        ;;
    darwin)
        open "http://localhost:$PORT"
        ;;
    *)
        echo -e "${YELLOW}[WARN]${NC} Système non reconnu. Ouvrez manuellement : http://localhost:$PORT"
        ;;
esac

# 7. Lancer le serveur HTTP Python 3
echo -e "${GREEN}[INFO]${NC} Serveur démarré sur le port $PORT"
echo -e "${GREEN}[INFO]${NC} Laissez cette fenêtre ouverte pendant l'utilisation."
echo -e "${YELLOW}[INFO]${NC} Appuyez sur Ctrl+C pour arrêter le serveur."
echo ""
echo "==================================================="
echo ""

# 8. Démarrer le serveur (avec gestion de l'arrêt propre)
python3 -m http.server "$PORT"

# 9. Message de fin si le serveur s'arrête
echo ""
echo -e "${GREEN}Serveur arrêté.${NC}"
read -p "Appuyez sur Entrée pour fermer..."
