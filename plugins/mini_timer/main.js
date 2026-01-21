const { Plugin } = require('obsidian');

module.exports = class MiniChrono extends Plugin {
    async onload() {
        this.seconds = 0;
        this.timerInterval = null;

        // Création de l'élément dans la barre d'état (en bas à droite)
        this.statusBarItemEl = this.addStatusBarItem();
        this.updateDisplay();

        // Clic gauche : Démarrer / Pause
        this.statusBarItemEl.onclick = () => this.toggle();
        
        // Clic droit : Réinitialiser
        this.statusBarItemEl.oncontextmenu = (e) => {
            e.preventDefault();
            this.reset();
        };

        console.log('Plugin Mini Chrono chargé');
    }

    updateDisplay() {
        const mins = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        const display = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        this.statusBarItemEl.setText(`⏱️ ${display}`);
        this.statusBarItemEl.setAttribute('title', 'Clic: Start/Pause | Clic droit: Reset');
    }

    toggle() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        } else {
            this.timerInterval = setInterval(() => {
                this.seconds++;
                this.updateDisplay();
            }, 1000);
        }
    }

    reset() {
        this.seconds = 0;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.updateDisplay();
    }

    onunload() {
        if (this.timerInterval) clearInterval(this.timerInterval);
    }
};