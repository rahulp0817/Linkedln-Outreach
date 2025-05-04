import axios from 'axios';
import https from 'https';

export interface RequestStatus {
  success: boolean;
  message: string;
}

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const getProviderIdFromUrl = async (
  leadUrl: string,
  accountId: string
): Promise<string> => {
  try {
    const profileHandle = leadUrl.split('linkedin.com/in/')[1]?.replace('/', '');
    if (!profileHandle) throw new Error('Invalid LinkedIn URL format.');

    const response = await axios.get(
      `${process.env.UNIPILE_BASE_URL}/api/v1/users/${profileHandle}?account_id=${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
        },
        httpsAgent,
      }
    );

    if (response.data?.provider_id) {
      return response.data.provider_id;
    }

    throw new Error('Provider ID not found.');
  } catch (err: any) {
    throw new Error(
      `Failed to get provider ID: ${err.response?.data?.message || err.message}`
    );
  }
};

export const sendConnectionRequest = async (
  accountId: string,
  leadUrl: string
): Promise<RequestStatus> => {
  try {
    const providerId = await getProviderIdFromUrl(leadUrl, accountId);

    const response = await axios.post(
      `${process.env.UNIPILE_BASE_URL}/api/v1/users/invite`,
      {
        account_id: accountId,
        provider_id: 'linkedin',  
        lead_url: leadUrl,  
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        httpsAgent,
      }
    );

    if (response.data?.status === 'success') {
      return {
        success: true,
        message: 'Connection request sent successfully.',
      };
    } else {
      return {
        success: false,
        message: response.data?.message || 'Unipile responded with an error.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Error: ${err.message || 'Connection request failed.'}`,
    };
  }
};
