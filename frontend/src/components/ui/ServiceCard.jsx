import { useState, useEffect } from "react";
import { deleteService, moveService, fetchAllTariffs } from "../../requests"; // Импорт функции для загрузки тарифов

export default function ServiceCard({ data, parentTariffId }) {
  const { service_id, service_code, service_type_name, param_value, param_unit } = data;

  const [moveMode, setMoveMode] = useState(false);
  const [newData, setNewData] = useState({ new_tariff_id: "" });
  const [allTariffs, setAllTariffs] = useState([]); // Состояние для тарифов
  const [isLoading, setIsLoading] = useState(true); // Для отображения загрузки

  // Загрузка всех тарифов при монтировании компонента
  useEffect(() => {
    const loadTariffs = async () => {
      try {
        setIsLoading(true); // Начало загрузки
        await fetchAllTariffs(setAllTariffs); // Загрузка тарифов
        setIsLoading(false); // Завершение загрузки
      } catch (err) {
        console.error("Ошибка при загрузке тарифов:", err);
        alert("Не удалось загрузить тарифы.");
      }
    };

    loadTariffs();
  }, []);

  const handleDelete = async () => {
    if (window.confirm(`Вы уверены, что хотите удалить услугу ${service_code}?`)) {
      try {
        await deleteService(service_id);
        window.location.reload();
      } catch (err) {
        alert("Ошибка при удалении услуги");
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    setNewData({ new_tariff_id: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newData.new_tariff_id) {
      alert("Выберите новый тариф перед переносом.");
      return;
    }
    try {
      await moveService(service_id, { new_tariff_id: newData.new_tariff_id });
      setMoveMode(false);
      window.location.reload();
    } catch (err) {
      alert("Ошибка при переносе услуги. Возможно, в целевом тарифе уже есть услуга такого типа.");
      console.error(err);
    }
  };

  return (
    <div className="inner-card-block">
      <div className="inner-card-block-title">
        <div className="inner-card-block-name">
          {service_code} — {service_type_name} ({param_value} {param_unit})
          <div className="inner-card-block-buttons">
            {!moveMode && (
              <img
                src="/images/icon-change.png"
                alt="Перенести услугу"
                onClick={() => setMoveMode(true)}
              />
            )}
            <img
              className="inner-card-block-buttons-delete"
              src="/images/icon-remove.png"
              alt="Удалить"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>

      {moveMode && (
        <form onSubmit={handleSubmit} className="form-block">
          <div className="form-input-block">
            <label>Новый тариф:</label>
            {isLoading ? (
              <p>Загрузка тарифов...</p>
            ) : (
              <select value={newData.new_tariff_id} onChange={handleChange} required>
                <option value="" disabled>
                  Выберите тариф
                </option>
                {(allTariffs || [])
                  .filter((t) => t.tariff_id !== parentTariffId) // Исключаем текущий тариф
                  .map((t) => (
                    <option key={t.tariff_id} value={t.tariff_id}>
                      {t.tariff_name} ({t.tariff_code})
                    </option>
                  ))}
              </select>
            )}
          </div>
          <div className="buttons-block">
            <button
              className="grey-button"
              type="button"
              onClick={() => setMoveMode(false)}
            >
              Отменить
            </button>
            <button className="filed-button" type="submit">
              Перенести
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
