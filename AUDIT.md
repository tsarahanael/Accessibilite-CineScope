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

## Problème 3 - Boutton d'inscription non focusable

### Problème identifié
Le boutton d'inscription a un ateleir n'as pas d'indicateur visual lors se qu'il as le focus et quand il est cliqué un message s'affiche sur lapage mais n'est pas mis en focus.\
 Cela invisibilise le boutton pour les utilisateurs clavier et les utilisateurs peuvent ne pas comprendre quel action ce boutton réalise (ce qui a été notre cas).

### Reproduction
 Parcourir l'application uniquement au clavier et essayer de focus le boutton "M'inscrire à \<Titre de l'atelier\>" sur une carte. Oserver que l'on a pas d'indicateur visuel du focus lorsqu'il passe sur le boutton.\
 Zoomer le navigateur a 200% et cliquer sur le boutton. Observer que rien ne se passe a l'écran puis scroller en bas de la page. Un message d'inscription est apparue mais n'as pas pris le focus.

### Comportement attendu
 Lorsque le boutton est focus il doit avoir l'indicateur visuel habituel du focus. Et lorsqu'il est cliquer la page doit scroller pour afficher le message d'inscription.

### Correction à apporter
Retirer le style css `outline: none` de la classe `reserve-button:focus-visible` qui ne fait qu'invisibiliser le focus. Utiliser une `useRef` pour réferencer le message de resrvation et lui mettre le focus dans la fonction `reserve`. Ajouter la ref a l'élément correspondant au message et lui ajouter un tabIndex négatif pour qu'il reste innaccessible en parcous classique

## Composant créé

Expliquez vos principaux choix d’accessibilité et les manipulations réalisées pour les vérifier.

## Mini-test

Indiquez le fichier, le résultat et ce que le test permet de vérifier.