
window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  if (event.which == 81) {
    //player 1 play card
    console.log("Q");
  } else if (event.which == 70) {
    //player 1 slap
    console.log("F")
  } else if (event.which == 80) {
    //player 2 play card
    console.log("P")
  } else if (event.which == 74) {
    //player 2 slap
    console.log("J")
  }
}
