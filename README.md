# AWS
### Développeur
- Tania OLIVIA

### Lancement du projet
Pour lancer le projet, vous devez suivre les consignes suivantes :
- Déplacez-vous au chemin /src
```
cd src
```
- Installation de paquettages
```
npm i
```
- Copiez le fichier .env.example et nommez-le ".env". Mettez votre connexion de base de données AWS RDS pour pouvoir se connecter à la base de données (host, username, password et database)
```
RDS_HOSTNAME=
RDS_USERNAME=
RDS_PASSWORD=
RDS_DATABASE=
JWT_KEY=secretkey
```
- Lancez le projet au <u>http://localhost:3001/</u>


### API Proposé et exemple de rêquete
Vous pouvez aussi tester les API suivante sur POSTMAN :
- Inscription (POST)
    - Lien : http://localhost:3001/user/register
    - Rêquete : 
        ```
        {
            "email": "test@gmail.com",
            "password": "test",
            "firstName": "test",
            "lastName": "test"
        }
        ``` 
- Connexion (POST)
    - Lien : http://localhost:3001/user/login
    - Rêquete : 
        ```
        {
            "email": "test@gmail.com",
            "password": "test"
        }
        ``` 
- Déconnexion (PATCH)
    - Lien : http://localhost:3001/user/logout/:id
- Affichage des informations d'un utilisateur (GET)
    - Lien : http://localhost:3001/users/:id
    - Dans la section headers, ajoutez la variable "Authorization" et mettez le token que vous avez reçu quand vous faites une connexion