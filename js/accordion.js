document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion');

  accordionItems.forEach(item => {
    const details = item.querySelector('details');
    const summary = item.querySelector('summary');

    if (details && summary) {
      details.addEventListener('toggle', () => {
        if (details.open) {
          accordionItems.forEach(otherItem => {
            const otherDetails = otherItem.querySelector('details');
            if (otherDetails !== details && otherDetails.open) {
              otherDetails.open = false;
            }
          });
        }
      });
    }
  });
});