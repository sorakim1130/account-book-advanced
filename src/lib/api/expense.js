import axios from "axios";

const JSON_SERVER_HOST = "https://wooden-aware-fowl.glitch.me";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    console.log('@@ error', error)
    alert("마치... 잘못된거같은데 데이터 로드 실패")
  }
};

// ["expenses", id]
export const getExpense = async ({queryKey}) => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses/${queryKey[1]}`);
    return response.data;
  } catch (error) {
    console.log('@@ error', error)
    alert("마치... 잘못된거같은데 데이터 로드 실패")
  }
};

export const postExpense = async (newExpense) => {
  try {
    const {data} = await axios.post(`${JSON_SERVER_HOST}/expenses`, newExpense);
    return data;
  } catch (error){
    console.log('@@ error', error)
    alert("뭔가... 잘못된거같은데 등록오류")
  }
}

// 수정된 지출
export const putExpense = async (updatedExpense) => {
  const {id, ...rest} = updatedExpense;
  try {
    const {data} = await axios.put(`${JSON_SERVER_HOST}/expenses/${id}`, rest);
    return data;
  } catch (error){
    console.log('@@ error', error)
    alert("뭔가... 잘못된거같은데 수정오류")
  }
}

// 삭제
export const deleteExpense = async (id) => {
  try {
    const {data} = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
    return data;
  } catch (error){
    console.log('@@ error', error)
    alert("뭔가... 잘못된거같은데 삭제오류")
  }
}