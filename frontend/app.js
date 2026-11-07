// Загружаем записи из API и выводим списком
const list = document.getElementById('items');
const status = document.getElementById('status');
const refresh = document.getElementById('refresh');

async function loadItems() {
  status.textContent = 'Загрузка…';
  list.replaceChildren();
  try {
    const res = await fetch('/api/items');
    if (!res.ok) {
      throw new Error(`сервер ответил ${res.status}: ${await res.text()}`);
    }
    const items = await res.json();
    if (items.length === 0) {
      status.textContent = 'Таблица items пуста. Добавьте строки в init/01_seed.sql и пересоздайте том БД.';
      return;
    }
    for (const item of items) {
      const li = document.createElement('li');
      const id = document.createElement('span');
      id.className = 'id';
      id.textContent = item.id;
      // textContent, а не innerHTML: данные из БД не исполнятся как HTML (защита от XSS)
      li.append(id, item.name);
      list.append(li);
    }
    status.textContent = `Записей в базе: ${items.length}`;
  } catch (err) {
    status.textContent = `Не удалось загрузить записи (${err.message}). Проверьте, что база запущена: docker compose ps`;
  }
}

refresh.addEventListener('click', loadItems);
loadItems();
