[![Netlify Status](https://api.netlify.com/api/v1/badges/1673960f-312c-45ac-9e23-43caabe3b5bb/deploy-status)](https://app.netlify.com/sites/pkmn-help/deploys)

**👉 <https://www.pkmn.help>**

# My Contributions 
- Replaced type colors with intuitive icons for better accessibility
- Added hover effects to navigation for improved UX
- Enhanced visual design while maintaining all functionality

## Before 
![image](https://github.com/user-attachments/assets/e89b53a7-795e-4648-8f90-10c9ae47a897)
## After 
![image](https://github.com/user-attachments/assets/47820700-da6e-4513-9f98-90328d61ff07)

*[Link to original PR if merged]*
# Pokémon Type Calculator

Your premier Pokémon companion

- Check type matchups

- Check type coverage against the Pokédex

- Plan your team

- View the Pokédex

  - See HD Pokémon Home art

  - Listen to Pokémon cry sound effects

  - See shiny forms

  - View stats

- Translated into many languages

## Development

```
$ npm install
$ npm start
```

## Updating Pokédex data

Make sure to delete all the images in `public/img` before running this command
or all existing images will be kept

```
$ npm run update-pokedex
```

or if you just want to update images without updating the Pokédex

```
$ npm run update-pokedex fast
```
