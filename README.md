# Termin-eventplaner

# Kombiniertes Projekt: Interaktive Kalender-Webseite und Event Planner

## Projektbeschreibung
Dieses Projekt kombiniert die Funktionalitäten einer interaktiven Kalender-Webseite und eines Event Planners. Es bietet Benutzern die Möglichkeit, Termine und Veranstaltungen in einer Kalenderansicht zu verwalten, sowie nach Veranstaltungen zu suchen und diese zu filtern. Die Anwendung speichert Daten lokal und ermöglicht eine intuitive Verwaltung.

---

## Funktionen

### Benutzerfunktionen
1. **Login und Benutzerverwaltung**:
   - Benutzer können sich mit einem Benutzernamen und Passwort anmelden.
   - Die Benutzerdaten werden in einer `users.csv`-Datei gespeichert.

2. **Kalenderansicht**:
   - Wechsel zwischen Tages-, Wochen- und Monatsansicht.
   - Termine und Veranstaltungen werden im Kalender angezeigt.

3. **Termin- und Veranstaltungsverwaltung**:
   - Hinzufügen, Bearbeiten und Löschen von Terminen und Veranstaltungen.
   - Speichern der Daten in `events.csv`.

4. **Such- und Filterfunktionen**:
   - Suche nach Veranstaltungstiteln oder Beschreibungen.
   - Filter nach Datum und Status (z. B. "geplant", "abgeschlossen").

### Admin-Funktionen
- Übersicht über alle Benutzer und Termine.
- Bearbeiten oder Löschen von Benutzer- und Veranstaltungsdaten.

---

## Technische Vorgaben
- **Frontend**: HTML, CSS, TypeScript (Tailwind CSS für Styling).
- **Datenverwaltung**: `.csv`-Dateien und Local Storage.
- **Navigation**: Unterstützung von SPA-Konzepten mit dynamischem Routing.

---

## Projektstruktur

### Dateien
plaintext
project/

├── index.html        // Login-Seite

├── calendar.html       // Kalenderseite mit Veranstaltungsübersicht

├── style.css          // Stylesheet

├── script.ts          // Haupt-TypeScript-Datei

├── users.csv           // Benutzerdaten

├── events.csv        // Veranstaltungsdaten

└── components/       // Wiederverwendbare Komponenten

    ├── calendar.ts   // Kalenderlogik

    ├── events.ts       // Veranstaltungslogik

    └── utils.ts        // Hilfsfunktionen


### CSV-Struktur
- **`users.csv`**:
csv
  username,password
  admin,admin123
  user1,userpass1
  
- **`events.csv`**:
csv
  date,time,title,description,status,username
  2025-01-15,10:00,Meeting,Project planning,geplant,user1
  

---

## Funktionen im Detail

### **Login-Funktion**
- Validierung der Benutzerdaten aus der `users.csv`.
- Weiterleitung zur Kalenderseite nach erfolgreichem Login.

### **Kalenderansicht**
- Dynamisches Rendering von Tages-, Wochen- und Monatsansichten.
- Anzeige von Terminen basierend auf dem aktuellen Benutzer.

### **Such- und Filterfunktionen**
- Textbasierte Suche nach Titel oder Beschreibung.
- Filterung nach Datum und Status.

### **Veranstaltungsmanagement**
- **Hinzufügen**: Neue Veranstaltungen werden in `events.csv` gespeichert.
- **Bearbeiten**: Änderungen an bestehenden Veranstaltungen.
- **Löschen**: Entfernen von Veranstaltungen aus der Liste.

### **Datenverwaltung**
- Speicherung von Veranstaltungsdaten im Local Storage für schnelle Zugriffe.
- Initialisierung mit Beispielveranstaltungen.

---

## Meilensteine

### **Tag 1: Grundstruktur**
- Erstellung der Login-Seite und Kalenderseite.
- Implementierung der Login-Logik.

### **Tag 2: Kalenderansicht**
- Tages-, Wochen- und Monatsansichten erstellen.
- Navigation zwischen Ansichten implementieren.

### **Tag 3: Such- und Filterfunktionen**
- Such- und Filterlogik implementieren.
- Dynamische Aktualisierung der Veranstaltungsübersicht basierend auf Benutzereingaben.

### **Tag 4: Veranstaltungsmanagement**
- Hinzufügen, Bearbeiten und Löschen von Veranstaltungen.
- Speicherung der Änderungen in `events.csv` und Local Storage.

### **Tag 5: Integration und Tests**
- Kombination aller Funktionen.
- Testen aller Benutzer- und Admin-Funktionen.
- Optimierung des Codes und Fehlerbehebung.

---

## Beispiel-Code

### Login-Funktion
typescript
function login(username: string, password: string): void {
    fetch('users.csv')
        .then(response => response.text())
        .then(data => {
            const users = data.split('\n').map(row => row.split(','));
            const validUser = users.find(user => user[0] === username && user[1] === password);
            if (validUser) {
                alert('Login erfolgreich!');
                window.location.href = 'calendar.html';
            } else {
                alert('Ungültiger Benutzername oder Passwort.');
            }
        });
}

### Hinzufügen einer Veranstaltung
typescript
function addEvent(event: { date: string; time: string; title: string; description: string; status: string; username: string }): void {
    const csvRow = `${event.date},${event.time},${event.title},${event.description},${event.status},${event.username}\n`;
    fetch('events.csv', {
        method: 'POST',
        body: csvRow
    }).then(() => {
        alert('Veranstaltung erfolgreich hinzugefügt!');
        loadEvents();
    });
}

---

## Erweiterungsmöglichkeiten
- **Benutzerrollen**: Unterschiedliche Rechte für Benutzer 
