import { useQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';

import type { GetEmployeeOfMonth } from '../types/GetEmployeeOfMonth'; // Import generated types

const endpoint = `${process.env.REACT_APP_API_URL}/graphql`; // Replace with your GraphQL endpoint URL

const graphQLClient = new GraphQLClient(endpoint);

export function useEmployeeOfMonth() {
  return useQuery('employeeOfMonth', async () => {
    const data = await graphQLClient.request<GetEmployeeOfMonth>(gql`
      query GetEmployeeOfMonth {
        employeeOfMonth {
          id
          firstName
          lastName
        }
      }
    `);

    return data.employeeOfMonth;
  });
}
