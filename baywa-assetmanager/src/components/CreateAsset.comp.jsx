import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import "./CreateAsset.style.css";

export default function CreateAsset() {
  //const { polls, setPolls } = useContext(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [formdata, setFormData] = useState({
    title: "",
    option1: "",
    option2: "",
    option3: "",
  });

  const onTriggerModal = () => {
    setModal(!modal);
  };

  const onInputChange = (event) => {
    const stateProp = event.target.name;
    const value = event.target.value;
    setFormData({ ...formdata, [stateProp]: value });
  };

  const onCreatePoll = (event) => {
    event.preventDefault();
    const { title, option1, option2, option3 } = formdata;
    const options = [
      { name: formdata.option1, value: 0 },
      { name: formdata.option2, value: 0 },
      { name: formdata.option3, value: 0 },
    ];

    const newDataArray = [
      ...polls,
      {
        title: formdata.title,
        options: options,
        id: uuidv4(),
        status: 0,
      },
    ];

    switch (false) {
      // Length
      case validator.matches(title.trim(), /^[a-zA-Z0-9äöüÄÖÜß ]{3,20}$/):
        setError(
          "Title needs at least 3 chars, only allowed are letters, numbers and spaces"
        );
        break;
      case validator.matches(option1.trim(), /^[a-zA-Z0-9äöüÄÖÜß ]{1,15}$/):
        setError("Option 1 needs at least 1 chars");
        break;
      case validator.matches(option2.trim(), /^[a-zA-Z0-9äöüÄÖÜß ]{1,15}$/):
        setError("Option 2 needs at least 1 chars");
        break;
      case validator.matches(option3.trim(), /^[a-zA-Z0-9äöüÄÖÜß ]{1,15}$/):
        setError("Option 3 needs at least 1 chars");
        break;

      //More Cases
      default:
        setError("");
        setPolls(newDataArray);
        localStorage.setItem("dataArray", JSON.stringify(newDataArray));
        setModal(false);
        setFormData({
          title: "",
          option1: "",
          option2: "",
          option3: "",
        });
        break;
    }
  };

  return (
    <>
      {
        {
          true: (
            <div className="modal">
              <h3>Create Poll</h3>
              <form>
                <input
                  onChange={onInputChange}
                  placeholder="Question"
                  value={formdata.title}
                  type="text"
                  name="title"
                />
                <input
                  onChange={onInputChange}
                  placeholder="Option 1"
                  value={formdata.option1}
                  type="text"
                  name="option1"
                />
                <input
                  onChange={onInputChange}
                  placeholder="Option 2"
                  value={formdata.option2}
                  type="text"
                  name="option2"
                />
                <input
                  onChange={onInputChange}
                  placeholder="Option 3"
                  value={formdata.option3}
                  type="text"
                  name="option3"
                />
                <button onClick={onCreatePoll}>Create</button>
                {error ? <p>{error}</p> : ""}
              </form>
              <button className="modal-close" onClick={onTriggerModal}>
                X
              </button>
            </div>
          ),
        }[modal]
      }
      <button className="trigger-modal" onClick={onTriggerModal}>
        + Neues Asset
      </button>
    </>
  );
}
