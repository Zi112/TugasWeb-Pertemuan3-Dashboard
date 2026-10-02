// ==========================================================================
// Filter kategori, pencarian, dan urutkan produk berdasarkan harga.
// Semua card produk sudah diberi atribut data-category, data-price,
// dan data-name di HTML, jadi di sini kita tinggal baca & susun ulang.
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('productGrid');
    const cards = Array.from(grid.children); // simpan urutan asli
    const categoryButtons = document.querySelectorAll('#categoryButtons .btn-filter');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const noResults = document.getElementById('noResults');

    let activeCategory = 'semua';

    function applyFilters() {
        const keyword = searchInput.value.trim().toLowerCase();
        const sortMode = sortSelect.value;

        // 1. Filter berdasarkan kategori + kata kunci pencarian
        let visible = cards.filter(card => {
            const cat = card.dataset.category;
            const name = card.dataset.name;
            const matchCategory = activeCategory === 'semua' || cat === activeCategory;
            const matchSearch = name.includes(keyword);
            return matchCategory && matchSearch;
        });

        // 2. Urutkan berdasarkan harga jika dipilih
        if (sortMode === 'asc') {
            visible.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
        } else if (sortMode === 'desc') {
            visible.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
        }

        // 3. Sembunyikan semua, lalu tampilkan ulang sesuai urutan hasil filter
        cards.forEach(card => card.classList.add('d-none'));
        visible.forEach(card => {
            card.classList.remove('d-none');
            grid.appendChild(card); // pindahkan ke urutan baru
        });

        noResults.classList.toggle('d-none', visible.length > 0);
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            applyFilters();
        });
    });

    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
});
