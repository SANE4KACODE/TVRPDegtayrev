// ---------- Адрес сервера ----------
const URL = "http://localhost:3001";

/* 
Функция аналогична fetchAllData для "менеджеров", 
но теперь для получения тарифов (tariffs) и связанных услуг (services).
На сервере должен быть маршрут GET /tariffs, 
возвращающий массив тарифов со вложенным списком услуг.
*/

export const fetchAllTariffs = async (setData) => {
  try {
    const response = await fetch(`${URL}/tariffs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при получении тарифов");
    }

    let data = await response.json();
    
    // Если нужно что-то сортировать в услугах — например, по service_code.
    data.forEach((tariff) => {
      if (tariff.services && tariff.services.length > 0) {
        tariff.services.sort((a, b) => a.service_code.localeCompare(b.service_code));
      }
    });

    setData(data);
  } catch (error) {
    console.error("Ошибка при загрузке тарифов:", error.message);
    alert("Ошибка при загрузке тарифов: " + error.message);
  }
};

// ---------- Запрос на добавление тарифа ----------
export const addTariff = async (data) => {
  /*
    data = {
      tariff_code: "TAR-XXX",
      tariff_name: "Название тарифа"
    }
   */
  try {
    const response = await fetch(`${URL}/tariffs/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при добавлении тарифа");
    }

    alert("Тариф успешно добавлен!");
    return 200;
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Ошибка при добавлении тарифа: " + error.message);
  }
};

// ---------- Запрос на обновление данных о тарифе ----------
export const updateTariff = async (data, id) => {
  /*
    Обычно id — это tariff_id (числовой).
    data = {
      tariff_name: "Новое название"
    }
    tariff_code не редактируем.
  */
  try {
    const response = await fetch(`${URL}/tariffs/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при обновлении данных тарифа");
    }

    alert("Данные о тарифе успешно обновлены!");
    return 200;
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Ошибка при обновлении тарифа: " + error.message);
  }
};

// ---------- Запрос на удаление тарифа ----------
export const deleteTariff = async (id) => {
  try {
    const response = await fetch(`${URL}/tariffs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Ошибка при удалении тарифа");
    }

    const result = await response.json();
    return result; // result.message
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Ошибка при удалении тарифа: " + error.message);
  }
};

// ---------- Запрос на получение всех типов услуг ----------
export const getServiceTypes = async () => {
  // в отличие от прежнего getSkills(setData), 
  // мы можем возвращать результат напрямую, а не через setData.
  try {
    const response = await fetch(`${URL}/service-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при получении типов услуг");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Ошибка при загрузке типов услуг:", error.message);
    alert("Ошибка при загрузке типов услуг: " + error.message);
  }
};

// ---------- Запрос на добавление типа услуги ----------
export const addServiceType = async (data) => {
  /*
    data = {
      service_type_name: "Мобильный интернет"
    }
  */
  try {
    const response = await fetch(`${URL}/service-types/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при добавлении типа услуги");
    }

    alert("Тип услуги успешно добавлен!");
    return 200;
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Ошибка при добавлении типа услуги: " + error.message);
  }
};

// ---------- Запрос на добавление услуги в тариф ----------
export const addService = async (data) => {
  /*
    data = {
      service_code: "SRV-... ",
      tariff_id: 1, 
      service_type_id: 2,
      param_value: 100,
      param_unit: "ГБ"
    }
   */
  try {
    const response = await fetch(`${URL}/services/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при добавлении услуги");
    }

    alert("Услуга успешно добавлена!");
    return 200;
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Ошибка при добавлении услуги: " + error.message);
  }
};

// ---------- Запрос на удаление услуги ----------
export const deleteService = async (id) => {
  try {
    const response = await fetch(`${URL}/services/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Ошибка при удалении услуги");
    }

    const result = await response.json();
    return result; 
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Ошибка при удалении услуги: " + error.message);
  }
};

// ---------- Запрос на перенос услуги между тарифами ----------
export const moveService = async (id, data) => {
  /*
    id = service_id (числовой)
    data = { new_tariff_id: 3 }
  */
  try {
    const response = await fetch(`${URL}/services/move/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при переносе услуги");
    }

    alert("Услуга успешно перенесена в другой тариф!");
    return 200;
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Ошибка при переносе услуги: " + error.message);
  }
};
