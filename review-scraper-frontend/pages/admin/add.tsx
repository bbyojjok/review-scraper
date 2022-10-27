import { useRouter } from 'next/router';
import useUser from '../../store/modules/userHook';
import Seo from '../../components/common/Seo';
import AdminBox from '../../components/admin/AdminBox';
import AddList from '../../components/admin/AddList';
import { useEffect } from 'react';

const Add = () => {
  const router = useRouter();
  const { isLoggedin } = useUser();

  useEffect(() => {
    if (!isLoggedin) {
      router.replace('/admin');
    }
  }, [isLoggedin]);

  if (!isLoggedin) {
    return null;
  }

  return (
    <>
      <Seo title="Admin" url={router.asPath} />
      <AdminBox>
        <AddList />
      </AdminBox>
    </>
  );
};

export default Add;
