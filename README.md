# ucto.pirati.cz

Aplikace pro zobrazení rozpočtu, jeho plnění apod. Data jsou čerpána přes JSON api z účetního softwaru Flexibee.

Lokalní běh:

```
npm install
ng serve -o
```

Následně je aplikace dostupná na adrese `localhost:4200` (s parametrem `-o` se rovnou otevře prohlížeč).

Data jsou v současnosti přímo v repozitáři ve složce `app/assets` (pro dev mode). Lze je aktualizovat pomoí skriptu `app/assets/download.py`


Build:

```
ng build --dev --e=dev
ng build --prod --e=prod
```
