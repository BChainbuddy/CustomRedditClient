import { useSelector } from "react-redux";
import "../../styles/Category.css";
import { getChosenCategory } from "./SubredditsSlice";

export default function Category({ item, posts }) {
  const chosenCategory = useSelector(getChosenCategory);

  return (
    <div
      onClick={() => {
        posts(item.display_name);
      }}
      className={`category ${
        chosenCategory === item.display_name ? "chosenCategory" : ""
      }`}
    >
      {item.icon_img ? (
        <img
          src={item.icon_img}
          height={30}
          width={30}
          className="categoryLogo"
        ></img>
      ) : (
        <div className="blank"></div>
      )}
      <p className="categoryName">{item.display_name}</p>
    </div>
  );
}
