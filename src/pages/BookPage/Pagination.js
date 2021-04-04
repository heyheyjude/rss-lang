import React, { useState } from "react";
import BookHeader from "./BookHeader";
import classesCss from "./BookPage.module.scss";

export default function Pagination({
  onPageChanged,
  currentPage,
  setCurrentPage,
  totalPagesCount,
  isLogged,
  successCounter,
  failCounter,
  totalCounter,
  settingsOn,
  groupPath,
  gameState,
}) {
  let [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    if (currentPage === "") {
      setCurrentPage(0);
    }
    setEditMode(false);
  };

  const turnPageBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const turnPageForward = () => {
    if (currentPage < totalPagesCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const turnToStart = () => {
    setCurrentPage(0);
  };

  const turnToEnd = () => {
    setCurrentPage(totalPagesCount - 1);
  };
  return (
<<<<<<< HEAD
    <div className={classesCss.pagination}>
      <BookHeader
        settingsOn={settingsOn}
        groupPath={groupPath}
        gameState={gameState}
        isLogged={isLogged}
      />
=======
    <div className={classesCss.Pagination}>
>>>>>>> b4fa4f6bc9914a97a0fa9edbe0c18232c5e1e17b
      <div
        onClick={turnToStart}
        className={[classesCss.doubleArrow, classesCss.arrow].join(" ")}
      >
        {"<<"}
      </div>
      <div
        onClick={turnPageBack}
        className={[classesCss.singleArrow, classesCss.arrow].join(" ")}
      >
        {"<"}
      </div>
      {!editMode && (
        <span onClick={activateEditMode}>
          {typeof currentPage === "number" ? currentPage + 1 : ""} /{" "}
          {totalPagesCount}
        </span>
      )}
      {editMode && (
        <input
          className={classesCss.selectedInput}
          value={typeof currentPage === "number" ? currentPage + 1 : ""}
          onChange={onPageChanged}
          autoFocus={true}
          onBlur={deactivateEditMode}
        />
      )}
      <div
        onClick={turnPageForward}
        className={[classesCss.singleArrow, classesCss.arrow].join(" ")}
      >
        {">"}
      </div>
      <div
        onClick={turnToEnd}
        className={[classesCss.doubleArrow, classesCss.arrow].join(" ")}
      >
        {">>"}
      </div>
      {isLogged && (
        <div>
          <div>Изучаемых слов: {totalCounter}</div>
          <div>
            Успешно: {successCounter}/{successCounter + failCounter}
          </div>
        </div>
      )}
    </div>
  );
}
