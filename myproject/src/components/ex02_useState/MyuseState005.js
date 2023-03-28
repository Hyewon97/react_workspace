import { useState } from "react";

const MyuseState005 = () => {
  const [customer, setCustomer] = useState({
    name: "고수",
    address: "서울시 강남구",
    phone: "010-000-0000",
  });

  const handleChange = (e) => {
    // dict에 키 값을 넣을 때 대괄호[]를 사용하기

    // e.target으로부터 id, value를 추출한다.
    const { id, value } = e.target;

    // 기존에 있는 값에(...customer), [id]: value 값을 업데이트 한다.
    setCustomer({ ...customer, [id]: value });

    // setCustomer((prevState) => {
    //   return { ...prevState, [id]: value };
    // });
  };

  return (
    <div>
      <p>
        <span>이름</span>
        <input
          type="text"
          value={customer.name}
          id="name"
          onChange={handleChange}
        />
      </p>

      <p>
        <span>주소</span>
        <input
          type="text"
          value={customer.address}
          id="address"
          onChange={handleChange}
        />
      </p>

      <p>
        <span>전화번호</span>
        <input
          type="text"
          value={customer.phone}
          id="phone"
          onChange={handleChange}
        />
      </p>

      <button>확인</button>
    </div>
  );
};

export default MyuseState005;
