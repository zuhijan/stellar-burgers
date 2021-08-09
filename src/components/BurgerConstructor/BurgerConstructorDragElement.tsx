import React, { FC, useRef } from "react";
import s from "./burgerConstructor.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  changePosition,
  deleteSelectedIngredient,
} from "../../services/store/ingredientsSlice";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { TIngredientType } from "../../services/utils/data";
import { XYCoord } from "dnd-core";

interface IBurgerConstructorDragElement {
  ingredient: TIngredientType;
  index: number;
}

const BurgerConstructorDragElement: FC<IBurgerConstructorDragElement> = ({
  ingredient,
  index,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "sort",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const dropIndex = index;

      // Don't replace items with themselves
      if (dragIndex === dropIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      dispatch(changePosition({ dragIndex, dropIndex }));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = dropIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "sort",
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      className={s.lineElement}
      style={{ opacity: opacity }}
      // @ts-ignore
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => {
          dispatch(
            deleteSelectedIngredient({
              ingredient: ingredient,
              index,
            })
          );
        }}
      />
    </div>
  );
};
export default BurgerConstructorDragElement;
