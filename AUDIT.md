# Audit AtelierLocal

## Binôme et environnement

- Membres : sarah.tsangou-wanvoukissa et lena.cerinotti
- Navigateur et version : 159.0

## Problème 1 — Cartes d’ateliers non accessibles

### Problème identifié
Dans la section « Les prochains ateliers », les cartes des différents ateliers ne sont pas accessibles au clavier. Cela rend le parcours de la page moins intuitif pour les personnes qui utilisent uniquement le clavier.

### Reproduction
Parcourir l’application uniquement au clavier et essayer de placer le focus sur l’un des ateliers.

### Comportement attendu
Le focus passe par chacun des titres des ateliers.

### Correction à apporter
Ajouter un `tabindex` aux titres de chaque carte.

## Problème 2 — La section déroulable

### Problème identifié
Dans la section déroulable de chaque atelier, le contrôle d’ouverture n’est pas accessible au clavier et les éléments masqués peuvent recevoir le focus sans être visibles. Cela rend le parcours de la page moins intuitif pour les personnes qui utilisent uniquement le clavier.

### Reproduction
Parcourir l’application uniquement au clavier et essayer de placer le focus sur le bouton « + » d’une carte. Observer que le lien « #infos-pratiques » reçoit le focus sans apparaître à l’écran.

### Comportement attendu
Le focus doit passer sur le bouton « + ». Le lien de la section « Détails de l’atelier » ne doit être accessible que si cette section est dépliée.

### Correction à apporter
Remplacer la `div` qui sert actuellement de bouton par un véritable bouton et utiliser l’attribut `hidden` sur la section repliée plutôt que `aria-hidden`. Ajouter un nom accessible avec `aria-label` précisant pour quel atelier les détails sont ouverts.

## Problème 3 — Bouton d’inscription non accessible au clavier

### Problème identifié
Le bouton d’inscription à un atelier n’a pas d’indicateur visuel lorsqu’il reçoit le focus. Lorsqu’on l’active, un message s’affiche sur la page, mais ne reçoit pas le focus. Cela rend le bouton difficile à repérer au clavier et son action peut ne pas être claire pour les utilisateurs.

### Reproduction
Parcourir l’application uniquement au clavier et essayer de placer le focus sur le bouton « M’inscrire à \<Titre de l’atelier\> » d’une carte. Observer l’absence d’indicateur visuel du focus.\
Zoomer le navigateur à 200 % et activer le bouton. Observer que le message d’inscription n’apparaît pas à l’écran. Faire défiler la page jusqu’en bas : le message s’y trouve, mais n’a pas reçu le focus.

### Comportement attendu
Lorsque le bouton reçoit le focus, un indicateur visuel doit être visible. Lorsqu’il est activé, la page doit défiler jusqu’au message d’inscription et celui-ci doit recevoir le focus.

### Correction à apporter
Retirer la règle CSS `outline: none` de la classe `reserve-button:focus-visible`, qui masque l’indicateur de focus. Utiliser `useRef` pour référencer le message de réservation et lui donner le focus dans la fonction `reserve`. Ajouter cette référence à l’élément correspondant au message et lui attribuer un `tabIndex` négatif afin qu’il ne soit pas ajouté au parcours Tab habituel.

## Problème 4 — La barre de recherche

### Problème identifié
La barre de recherche n’a pas de libellé associé. Lorsqu’elle reçoit le focus, un lecteur d’écran ne peut pas indiquer à l’utilisateur son utilité.

### Reproduction
Ouvrir les outils de développement du navigateur, accéder à l’onglet « Accessibilité » et sélectionner le champ de recherche. On constate qu’il n’a ni nom accessible ni description.

### Comportement attendu
L’élément devrait être nommé par le texte « Rechercher un atelier » situé au-dessus. Le texte « Saisissez un titre ou une ville », situé en dessous, devrait être associé au champ comme indication.

### Correction à apporter
Ajouter les attributs `aria-labelledby` et `aria-describedby` à l’élément `input`.

## Problème 5 — Image de l’atelier de sérigraphie

### Problème identifié
L’image n’a pas de texte alternatif. Certains lecteurs d’écran peuvent alors annoncer le nom du fichier, ce qui ajoute une information inutile.

### Reproduction
Un audit Lighthouse de la page signale ce problème dans la section « Accessibilité ». Il est également possible de le constater dans Firefox, dans l’onglet « Accessibilité » des outils de développement.

Avec le lecteur d’écran NVDA, le narrateur décrit l’image.

### Comportement attendu
Les images doivent avoir un texte alternatif descriptif.

### Correction à apporter
Ajouter une propriété décrivant l’image à l’objet `workshop`, puis la lier à l’attribut `alt` de l’élément `img`. Ajouter un champ `imageAlt` aux ateliers pour y enregistrer une description de l’image.

## Problème 6 — Nom des sections

### Problème identifié
Les sections portent le nom des titres qu’elles contiennent, qui ne décrivent pas toujours clairement leur objectif.

### Reproduction
Ouvrir les outils de développement du navigateur, accéder à l’onglet « Accessibilité » et sélectionner une section. Observer que son nom ne décrit pas correctement son objectif.

### Comportement attendu
Les sections doivent être nommées à partir de leur surtitre (« eyebrow »), qui décrit leur objectif.

### Correction à apporter
Ajouter un identifiant aux surtitres et le référencer pour nommer les sections.

## Problème 7 — Libellés des boutons et des liens

### Problème identifié
Les boutons et les liens de la page n’avaient pas d’`aria-label`. Les lecteurs d’écran ne pouvaient donc pas toujours en comprendre la fonction.

### Reproduction
Avec le lecteur d’écran NVDA, il était difficile de comprendre la fonction de certains boutons et liens.

### Comportement attendu
Les boutons et les liens doivent avoir un nom accessible qui décrit leur fonction.

### Correction à apporter
Ajouter un `aria-label` aux boutons et aux liens qui n’ont pas déjà un nom accessible pertinent.

## Composant créé

Chaque carte comporte l’action « Poser une question », y compris celle d’un atelier complet. Elle ouvre une modale native `<dialog>` dont le titre et le contexte identifient l’atelier. À l’ouverture, le focus est placé sur le select natif, sans sujet présélectionné. Les champs obligatoires ont des labels et des textes d’aide ; l’adresse est validée au format attendu et la question ne peut être vide ou composée d’espaces.

La validation utilise `readRequest`. Si des champs sont invalides, un résumé reçoit le focus, annonce les erreurs et propose des liens permettant de rejoindre les champs concernés. Les valeurs déjà saisies sont conservées. Échap, le bouton de fermeture et « Annuler » ferment la modale sans envoyer de demande et rendent le focus au bouton qui l’a ouverte. Après un envoi valide, la modale se ferme et un statut confirme l’atelier et le sujet, sans afficher l’adresse électronique. L’envoi est simulé : aucune demande ni coordonnée n’est transmise.

Vérifications au clavier dans le navigateur : ouverture de la modale, focus initial sur le select, fermeture avec Échap et retour du focus au bouton d’ouverture. Les tests dans `src/__tests__/Composant.test.tsx` vérifient également le parcours invalide puis corrigé, la fermeture avec « Annuler », ainsi que le cas d’un atelier complet. Aucun lecteur d’écran n’a été utilisé ; aucune vérification de restitution vocale n’est donc rapportée.

## Mini-test

Dans `src/__tests__/Composant.test.tsx`, le test « conserve le sujet et la question après un envoi sans courriel, puis confirme l’atelier et le sujet après correction » utilise `render(<App />)` et `userEvent` pour vérifier le scénario suivant :

1. Ouvrir « Poser une question » pour « Une tasse en céramique », choisir « Le matériel à apporter » et rédiger une question.
2. Envoyer sans adresse électronique et vérifier qu’une erreur est indiquée, que la modale reste ouverte, que le sujet et la question sont conservés et qu’aucune confirmation ne s’affiche.
3. Renseigner une adresse valide, puis vérifier que la modale se ferme et que la confirmation indique « Une tasse en céramique » et « Le matériel à apporter ».

Résultat : le test passe. Il vérifie la reprise après un envoi incomplet et la confirmation de l’atelier et du sujet choisis.