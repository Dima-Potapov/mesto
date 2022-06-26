export class Section {
    constructor(
        {
            items,
            renderer
        },
        cardsContainer
    ) {
        this.items = items;
        this.renderer = renderer;
        this.cardsContainer = document.querySelector(cardsContainer);
    }

    renderElements() {
        this.items.forEach(item => {
            const card = this.renderer(item);

            this.addItem(card);
        })
    }

    addItem(cardElement) {
        this.cardsContainer.prepend(cardElement);
    }
}