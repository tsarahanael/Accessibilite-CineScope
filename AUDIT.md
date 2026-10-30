# Audit AtelierLocal

## Binôme et environnement

- Membres : sarah.tsangou-wanvoukissa lena.cerinotti
- Navigateur et version : 159.0

## Problème 1 — Cartes Ateliers non accesible

### Problème identifié
 Dans la Section nommée "Les prochains ateliérs" les cartes des différents atteliers ne sont pas accéssible.\
 Cela rend le parcours de la page moins intuitif pour les utilisateurs limité au parcours par clavier.

### Reproduction
 Parcourir l'application uniquement au clavier et essayer de focus un des atelier

### Comportement attendu
 Le focus passe par chaqu'un des titres des ateliers

### Correction à apporter
Ajouter un `tabindex` sur les titre de chaque cartes


## Composant créé

Expliquez vos principaux choix d’accessibilité et les manipulations réalisées pour les vérifier.

## Mini-test

Indiquez le fichier, le résultat et ce que le test permet de vérifier.