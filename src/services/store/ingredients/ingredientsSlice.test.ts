import ingredientsReducer, {
  addSelectedIngredient,
  changePosition,
  cleanBasket,
  deleteSelectedIngredient,
} from "./ingredientsSlice";
import { initialState } from "./ingredientsSlice";
import { INGREDIENT_EXAMPLE } from "./dataExample";

const payloadBun = INGREDIENT_EXAMPLE;
const payloadMain = { ...INGREDIENT_EXAMPLE, type: "main" };
const payloadSauce = { ...INGREDIENT_EXAMPLE, type: "sauce" };

const expStateBun = {
  ...initialState,
  selectedIngredients: {
    ...initialState.selectedIngredients,
    bun: payloadBun,
  },
};

const expStateMain = {
  ...initialState,
  selectedIngredients: {
    ...initialState.selectedIngredients,
    other: [payloadMain],
  },
};

const expStateSauce = {
  ...initialState,
  selectedIngredients: {
    ...initialState.selectedIngredients,
    other: [payloadSauce],
  },
};

describe("Ingredients reducer tests", () => {
  test("should return the initial state", () =>
    expect(ingredientsReducer(undefined, { type: {} })).toEqual(initialState));

  test("should handle order/addSelectedIngredient / bun", () => {
    expect(
      ingredientsReducer(initialState, addSelectedIngredient(payloadBun))
    ).toEqual(expStateBun);
  });

  test("should handle order/addSelectedIngredient / main", () => {
    expect(
      ingredientsReducer(initialState, addSelectedIngredient(payloadMain))
    ).toEqual(expStateMain);
  });

  test("should handle order/addSelectedIngredient / sauce", () => {
    expect(
      ingredientsReducer(initialState, addSelectedIngredient(payloadSauce))
    ).toEqual(expStateSauce);
  });

  test("should handle order/deleteSelectedIngredient", () => {
    expect(
      ingredientsReducer(expStateSauce, deleteSelectedIngredient({ index: 0 }))
    ).toEqual(initialState);
  });

  test("should handle order/changePosition", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          selectedIngredients: {
            ...initialState.selectedIngredients,
            other: [payloadMain, payloadSauce],
          },
        },
        changePosition({ dragIndex: 0, hoverIndex: 1 })
      )
    ).toEqual({
      ...initialState,
      selectedIngredients: {
        ...initialState.selectedIngredients,
        other: [payloadSauce, payloadMain],
      },
    });
  });

  test("should handle order/cleanBasket", () => {
    expect(ingredientsReducer(expStateMain, cleanBasket())).toEqual(
      initialState
    );
  });
});
