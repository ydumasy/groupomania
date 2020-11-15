<template>
  <div>
    <div class="charter">
      <h1 class="charter--title">Charte du forum</h1>
      <h3>Généralités</h3>
      <p>Nous rappelons que l'auteur d'un message est responsable des propos qu'il publie. En cas de manquement grave à la charte ou des lois et règlements en vigueur en France, ce dernier s'expose à une suppression de ses messages, voire de son compte, ainsi qu'aux sanctions civiles ou pénales afférentes.</p>
      <p>Groupomania ne peut être tenu pour responsable quant à l'agissement de certains membres sur le forum. En participant aux forums de Groupomania, vous autorisez les administrateurs du site à modérer ou supprimer n'importe quel message sans autorisation préalable de votre part.</p>
      <h3>Contenus non autorisés</h3>
      <ul class="charter--list">
        <li>Les messages à caractères pornographique et pédopornographique.</li>
        <li>Les messages racistes, xénophobes, révisionnistes, faisant l'apologie de crime de guerre, discriminant ou incitant à la haine qu’elle soit à l'encontre d'une personne, d'un groupe de personnes en raison de leurs origines, leur ethnie, leurs croyances ou leur mode de vie.</li>
        <li>Les messages à caractère insultants, violents, menaçants, au contenu choquant ou portant atteinte à la dignité humaine.</li>
        <li>Les messages diffamatoires.</li>
        <li>Les messages bafouant le droit d'auteur, le droit à l'image et le respect à la vie privée.</li>
        <li>Les messages dans le but de nuire au forum tel que le spam ou bien ceux générant une mauvaise ambiance ou un mauvais esprit.</li>
        <li>Les liens de parrainages et les publicités, qu'elles soient commerciales ou non. La mention de professionnel (ex : courtier) peut-être indiqué dans les messages, mais aucun lien ou caractère promotionnel ne peut être inséré.</li>
        <li>Les démarchages, de manière générale, sont interdits et peuvent conduire à la suppression du compte.</li>
        <li>Et de manière plus générale, tous les messages contraires aux lois en vigueur en France.</li>
      </ul>
      <h3>Bonnes pratiques</h3>
      <ul class="charter--list">
        <li>Évitez d'écrire en majuscules.</li>
        <li>Évitez le langage SMS.</li>
        <li>Restez toujours poli et courtois dans vos échanges.</li>
        <li>Ne communiquez jamais d'informations personnelles pouvant vous porter préjudice (telles que numéro de CB, numéro de carte d'identité...).</li>
      </ul>
    </div>
    <button @click="returnToMain">Retour</button>
  </div>
</template>

<script>
  export default {
    name: 'Charter',
    props: {
      returnToMain: {
        type: Function,
        required: true
      }
    }
  }
</script>