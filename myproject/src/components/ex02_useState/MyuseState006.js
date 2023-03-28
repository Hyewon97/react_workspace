import { useState } from "react";

const MyuseState006 = () => {
  const [customerList, setCustomerList] = useState([
    {
      name: "고수",
      address: "서울시 강남구",
      phone: "010-000-0000",
    },
    {
      name: "여진구",
      address: "서울시 서초구",
      phone: "010-111-1111",
    },
  ]);

  // 값을 입력하면 여기에 저장이 된다.
  // 값을 저장한 이후에 초기화를 시켜줘야 한다. 이 작업은 A
  // 무조건 규칙을 따라야 한다. 아마 초기화 시키는 방법이 따로 선어이 되어 있는 듯
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    //setCustomer({ ...customer, [e.target.name]: e.target.value });

    const { name, value } = e.target;
    // 방법1
    //  setCustomer({ ...customer, [name]:value});

    // 방법2
    setCustomer((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleCommit = () => {
    // 객체로 해서 들어가야 한다.
    // 객체 자체가 들어가야해서 대입 자체를 해야한다. customer이 ...아 아니라 그 자체를 넣어야 함
    // 값 추가하기
    // 기존에 있는 값을 계속 복사하는 과정이 있을 것이다.
    setCustomerList([...customerList, customer]);

    // 이 작업은 A에서 한다.... 초기화 하는 작업
    setCustomer({
      name: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div>
      <p>
        <span>이름</span>
        <input
          type="text"
          value={customer.name}
          name="name"
          onChange={handleChange}
        />
      </p>

      <p>
        <span>주소</span>
        <input
          type="text"
          value={customer.address}
          name="address"
          onChange={handleChange}
        />
      </p>

      <p>
        <span>전화번호</span>
        <input
          type="text"
          value={customer.phone}
          name="phone"
          onChange={handleChange}
        />
      </p>

      <button onClick={handleCommit}>확인</button>

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>주소</th>
            <th>전화</th>
          </tr>
        </thead>

        <tbody>
          {customerList.map((element, idx) => {
            return (
              // Warning: Each child in a list should have a unique "key" prop.
              // 자식은 유니크한 키 값을 가져야 한단
              <tr key={idx}>
                <td>{element.name}</td>
                <td>{element.address}</td>
                <td>{element.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default MyuseState006;
