// 중괄호를 사용하면 하나의 값만 받아오겠다는 뜻
const Myprops003 = (props) => {
  return (
    <div>
      <p>
        고객님 이름 : {props.name} 나이 : {props.age} 지역 : {props.loc}
      </p>
    </div>
  );
};
export default Myprops003;
