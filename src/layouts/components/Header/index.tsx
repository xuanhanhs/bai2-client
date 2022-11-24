import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { AiOutlineLogout } from 'react-icons/ai';
import { authActions } from 'src/redux/slices';

function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(authActions.signOut());
  };

  return (
    <header
      style={{
        boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
      }}
      className="z-[2] mx-[24px] mt-[18px] px-[48px] flex items-center justify-between fixed top-0 left-0 right-0 h-[62px] bg-[#fff] rounded-[8px]"
    >
      <div className="text-[14px] font-[500]">{user?.fullname}</div>
      <button onClick={handleSignOut} title="Sign Out">
        <AiOutlineLogout fontSize={22} color="##010102" />
      </button>
    </header>
  );
}

export default Header;
