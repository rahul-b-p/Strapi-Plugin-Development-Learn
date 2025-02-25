import React, { useEffect } from 'react';
import { useNotification } from '@strapi/helper-plugin';

interface EventData {
  model: string;
  entry: {
    id: number | string;
    action?: string;
  };
  sdkInfo?: {
    operation: string;
    timestamp: string;
  };
}

const NotificationListener = () => {
  const toggleNotification = useNotification();

  useEffect(() => {
    const connectToEventHub = () => {
      const eventSource = new EventSource('/admin/events');

      eventSource.addEventListener('open', () => {
        console.log('Connected to Strapi Event Hub');
      });

      eventSource.addEventListener('error', (err) => {
        console.error('Error connecting to Strapi Event Hub', err);
        setTimeout(() => {
          eventSource.close();
          connectToEventHub();
        }, 5000);
      });

      // Add a specific listener for SDK events
      eventSource.addEventListener('sdk.action', (event) => {
        try {
          const data = JSON.parse(event.data) as EventData;
          const operation = data.sdkInfo?.operation || 'operation';

          toggleNotification({
            type: 'info',
            message: `SDK ${operation} on ${data.model} with ID: ${data.entry.id}`,
          });
        } catch (error) {
          console.error('Error parsing SDK event data', error);
        }
      });

      // Keep existing event listeners for standard CRUD operations
      eventSource.addEventListener('entry.create', (event) => {
        try {
          const data = JSON.parse(event.data) as EventData;

          // Check if this is an SDK operation
          if (data.sdkInfo) {
            toggleNotification({
              type: 'success',
              message: `SDK created new ${data.model} with ID: ${data.entry.id}`,
            });
          } else {
            toggleNotification({
              type: 'success',
              message: `New ${data.model} created with ID: ${data.entry.id}`,
            });
          }
        } catch (error) {
          console.error('Error parsing create event data', error);
        }
      });

      // Update the other event listeners similarly
      eventSource.addEventListener('entry.update', (event) => {
        try {
          const data = JSON.parse(event.data) as EventData;

          // Check if this is an SDK operation
          if (data.sdkInfo) {
            toggleNotification({
              type: 'info',
              message: `SDK updated ${data.model} with ID: ${data.entry.id}`,
            });
          } else {
            toggleNotification({
              type: 'info',
              message: `${data.model} updated with ID: ${data.entry.id}`,
            });
          }
        } catch (error) {
          console.error('Error parsing update event data', error);
        }
      });

      eventSource.addEventListener('entry.delete', (event) => {
        try {
          const data = JSON.parse(event.data) as EventData;

          // Check if this is an SDK operation
          if (data.sdkInfo) {
            toggleNotification({
              type: 'warning',
              message: `SDK deleted ${data.model} with ID: ${data.entry.id}`,
            });
          } else {
            toggleNotification({
              type: 'warning',
              message: `${data.model} deleted with ID: ${data.entry.id}`,
            });
          }
        } catch (error) {
          console.error('Error parsing delete event data', error);
        }
      });

      return eventSource;
    };

    const eventSource = connectToEventHub();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [toggleNotification]);

  return null;
};

export default NotificationListener;
