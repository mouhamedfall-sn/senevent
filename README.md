# SénEvent

## Équipe DAWM — Master 1 RETEL

| Membre | Rôle Mandat 1 |
|--------|--------------|
| Mouhamed | Git master |
| Membre2 | Membre |
| Membre3 | Membre |

Mandat 1 (Labs 0 à 2) : Git master = Mouhamed

## En ligne

- Application web : https://senevent-fawn.vercel.app
- Deploiement continu : chaque merge sur main met la production a jour, chaque Pull Request recoit une URL de previsualisation.
- Application Android (APK) : https://expo.dev/accounts/mouhamed10/projects/senevent/builds/f8b948e8-b0ac-464c-b4f2-600024fec35c
- Version mobile : 1.0.0 (profil EAS "preview")

## Lancer le projet en local

- `npm install` a la racine
- Web : dans `apps/web`, creer `.env.local` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), puis `npm run dev`
- Mobile : dans `apps/mobile`, creer `.env` (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`), puis `npx expo start`
