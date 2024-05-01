import { getServiceEndpoints } from '../config/serviceEndpoints';
import internalALB from './InternalALB';

export const getOrganizations = () => {
  const { CORE_SERVICE_URL } = getServiceEndpoints();

  return internalALB.get(`${CORE_SERVICE_URL}/organizations`).then(({ data }) => data.data);
};
