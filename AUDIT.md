# Audit AtelierLocal

## Binôme et environnement

- Membres : sarah.tsangou-wanvoukissa lena.cerinotti
- Navigateur et version : 159.0

## Problème 1 — Cartes Ateliers non accesible

### Problème identifié
 Dans la Section nommée "Les prochains ateliérs" les cartes des différents atteliers ne sont pas focusable.\
 Cela rend le parcours de la page moins intuitif pour les utilisateurs limité au parcours par clavier.

### Reproduction
 Parcourir l'application uniquement au clavier et essayer de focus un des atelier

### Comportement attendu
 Le focus passe par chaqu'un des titres des ateliers

### Correction à apporter
Ajouter un `tabindex` sur les titre de chaque cartes

## Problème 2 — La section déroulable

### Problème identifié
 Dans la Section déroulable de chaque atelier n'est pas focusable et les élements cachées sont focusable sans les afficher.\
 Cela rend le parcours de la page moins intuitif pour les utilisateurs limité au parcours par clavier.

### Reproduction
 Parcourir l'application uniquement au clavier et essayer de focus le boutton "+" sur une carte. Observer que les lien "#infos-pratiques" est focus sans apparaitre a l'écran

### Comportement attendu
 Le focus dois passer sur le boutton plus et le lien dans la section "Details de l'atelier" ne doit etre accessible que si la section est dévoilée.

### Correction à apporter
Modifier le boutton plus, qui est actuellement une `div`, en un boutton et  utiliser l'attribut `hidden` sur la section caché au lieu de `aria-hidden`


## Composant créé

Expliquez vos principaux choix d’accessibilité et les manipulations réalisées pour les vérifier.

## Mini-test

Indiquez le fichier, le résultat et ce que le test permet de vérifier.