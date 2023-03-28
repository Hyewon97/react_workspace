import { useState } from "react";

const MyuseState004 = () => {
  const [customer, setCustomer] = useState({
    name: "고수",
    address: "서울시 강남구",
    phone: "010-000-0000",
  });

  // 현재 이벤트가 발생된 곳에 name을 넣어준다.
  const handleName = (e) => {
    console.log(e.target.value);
    console.log(customer.address);

    // 셋으로 하면 모든 함수에 있는 애들이 바뀐다.
    // 그래서 기존에 있는 애들을 다 복사하고.. 이거를 항상 앞에 써줘야한다.

    // setCustomer({ ...customer, name: e.target.value }); // 비동기화 식으로 처리가 된다.
    console.log(customer.address);

    setCustomer((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };

  const handleAddress = (e) => {
    // setCustomer({ ...customer, address: e.target.value });
    // 아래 방식으로 바꿔서 할 수 있다.
    setCustomer((prevState) => {
      return { ...prevState, address: e.target.value };
    });
  };

  const handlePhone = (e) => {
    // setCustomer({ ...customer, phone: e.target.value });
    setCustomer((prevState) => {
      return { ...prevState, phone: e.target.value };
    });
  };
  return (
    <div>
      <p>
        <span>이름</span>
        <input type="text" value={customer.name} onChange={handleName} />
      </p>

      <p>
        <span>주소</span>
        <input type="text" value={customer.address} onChange={handleAddress} />
      </p>

      <p>
        <span>전화번호</span>
        <input type="text" value={customer.phone} onChange={handlePhone} />
      </p>

      <button>확인</button>
    </div>
  );
};

export default MyuseState004;
