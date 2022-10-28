import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useUser from '../../store/modules/userHook';
import Seo from '../../components/common/Seo';
import AdminBox from '../../components/admin/AdminBox';
import AddList from '../../components/admin/AddList';

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
