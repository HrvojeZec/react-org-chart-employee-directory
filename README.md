# **react-org-chart-employee-directory**

## **Funkcionalnosti projekta**

1. Učitavanje podataka
   - Dohvaćanje popisa zaposlenika s API-ja koristeći fetch GET metodu
   - handle preLoad data
2. Prikaz podataka
   - Prikaz zaposlenika u tablici s sljedećim stupcima: #, Slika, Ime, Prezime, Email, Pozicija, Akcija (pregled)
   - Implementacija lazy loadinga za zaposlenike kako bi se novi zaposlenici prikazivali dok korisnik skrola prema dolje
   - Pretraživanje zaposlenika po imenu i poziciji u realnom vremenu.
3. Responzivnost
   - Stranica je optimizirana za prikaz na različitim veličinama zaslona, uključujući mobilne uređaje i desktop računala.
4. Navigacijska traka
   - Navigacija između stranica za prikaz zaposlenika i unos podataka
5. Stranica s organizacijskim dijagramom:
   - Implementacija komponente za prikaz organizacijskog dijagrama koristeći dohvaćene podatke.
   - Dijagram jasno prikazuje hijerarhijsku strukturu zaposlenika.
  
 ## Tehnologije
 - Frontend: React
 - UI Library: Mantine
