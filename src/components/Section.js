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
        this.items.forEach(data => {
            this.addItem(data);
        })
    }

    addItem(data) {
        const cardElement = this.renderer(data);

        this.cardsContainer.prepend(cardElement);
    }
}