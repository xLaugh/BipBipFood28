document.addEventListener('DOMContentLoaded', () => {
    const totalText = document.getElementById('total-text');
    const resetButton = document.getElementById('reset-button');
    const categoriesContainer = document.getElementById('categories-container');

    let total = 0.0;

    class MenuItem {
        constructor(name, price) {
            this.name = name;
            this.price = price;
            this.quantity = 0;
            this.qtyText = null;
        }

        createRow() {
            const row = document.createElement('div');
            row.className = 'item-row';

            const nameText = document.createElement('span');
            nameText.textContent = `${this.name} - ${this.price.toFixed(2)}€`;

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.className = 'minus';
            minusButton.onclick = () => {
                if (this.quantity > 0) {
                    this.quantity--;
                    this.qtyText.textContent = this.quantity;
                    updateTotal();
                }
            };

            this.qtyText = document.createElement('span');
            this.qtyText.textContent = this.quantity;

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.onclick = () => {
                this.quantity++;
                this.qtyText.textContent = this.quantity;
                updateTotal();
            };

            row.append(nameText, minusButton, this.qtyText, plusButton);
            return row;
        }
    }

    const burgers = [
        new MenuItem("Cheese", 4.0),
        new MenuItem("Classic", 7.0),
        new MenuItem("Bacon", 8.0),
        new MenuItem("Chicken", 8.0),
        new MenuItem("Raclette", 8.0),
        new MenuItem("Raclette XL", 12.5),
        new MenuItem("BIG 300G", 12.5),
    ];

    const tacos = [
        new MenuItem("Classico", 8.0),
        new MenuItem("Poulet", 9.5),
        new MenuItem("Carnivore", 11.0),
    ];

    const gratines = [
        new MenuItem("Curry coco", 12.5),
    ];

    const desserts = [
        new MenuItem("Tiramisu", 3.5),
    ];

    const extras = [
        new MenuItem("Barre chocolatée", 1.5),
        new MenuItem("Chips", 1.5),
        new MenuItem("Eau", 1.0),
        new MenuItem("Cannette", 2.0),
        new MenuItem("Jus de bissap", 2.5),
        new MenuItem("Redbull", 3.0),
    ];

    const livraison = [
        new MenuItem("Supplément", 0.5),
        new MenuItem("Supplément", 1.0),
        new MenuItem("Supplément", 2.0),
    ];

    const categories = [
        { title: "🍔 Burgers", items: burgers },
        { title: "🌮 Tacos", items: tacos },
        { title: "🧀 Gratinés", items: gratines },
        { title: "🍰 Desserts", items: desserts },
        { title: "🥤 Extras", items: extras },
        { title: "🚚 Livraison", items: livraison },
    ];

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const title = document.createElement('h3');
        title.textContent = category.title;
        categoryDiv.appendChild(title);

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'hidden';

        category.items.forEach(item => {
            itemsContainer.appendChild(item.createRow());
        });

        categoryDiv.appendChild(itemsContainer);
        categoriesContainer.appendChild(categoryDiv);

        title.onclick = () => {
            itemsContainer.classList.toggle('hidden');
        };
    });

    function updateTotal() {
        total = 0.0;
        categories.forEach(category => {
            category.items.forEach(item => {
                total += item.quantity * item.price;
            });
        });
        totalText.textContent = `Total: ${total.toFixed(2)} €`;
    }

    resetButton.onclick = () => {
        categories.forEach(category => {
            category.items.forEach(item => {
                item.quantity = 0;
                item.qtyText.textContent = item.quantity;
            });
        });
        updateTotal();
    };
});