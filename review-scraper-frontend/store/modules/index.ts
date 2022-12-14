import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import user from './user';

// 루트 리듀서
const rootReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return combineReducers({ user })(state, action);
  }
};

export default rootReducer;

// 루트 리듀서의 반환값을 유추해줍니다.
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내기
export type RootState = ReturnType<typeof rootReducer>;
