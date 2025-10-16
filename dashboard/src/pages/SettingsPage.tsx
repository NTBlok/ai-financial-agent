import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  theme: 'light' | 'dark' | 'system';
};

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      riskTolerance: 'moderate',
      theme: 'light',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Settings updated:', data);
    setIsLoading(false);
    setIsEditing(false);
    toast.success('Settings saved successfully!');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Profile</h3>
          <p className="mt-1 text-sm text-gray-500">Update your personal information.</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="divide-y divide-gray-200">
          <div className="px-6 py-6 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    disabled={!isEditing}
                    {...register('firstName', { required: 'First name is required' })}
                    className={`block w-full rounded-md shadow-sm ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} sm:text-sm`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    disabled={!isEditing}
                    {...register('lastName', { required: 'Last name is required' })}
                    className={`block w-full rounded-md shadow-sm ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} sm:text-sm`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    disabled={!isEditing}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`block w-full rounded-md shadow-sm ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} sm:text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    disabled={!isEditing}
                    {...register('phone')}
                    className={`block w-full rounded-md shadow-sm ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} sm:text-sm`}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tolerance
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'conservative', label: 'Conservative', description: 'Lower risk, stable returns' },
                    { id: 'moderate', label: 'Moderate', description: 'Balanced risk and return' },
                    { id: 'aggressive', label: 'Aggressive', description: 'Higher risk, potential for higher returns' },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={option.id}
                        type="radio"
                        value={option.id}
                        disabled={!isEditing}
                        {...register('riskTolerance')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                        <span className="font-medium">{option.label}</span>
                        <span className="block text-sm text-gray-500">{option.description}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="flex space-x-6">
                  {[
                    { id: 'light', label: 'Light' },
                    { id: 'dark', label: 'Dark' },
                    { id: 'system', label: 'System' },
                  ].map((theme) => (
                    <div key={theme.id} className="flex items-center">
                      <input
                        id={theme.id}
                        type="radio"
                        value={theme.id}
                        disabled={!isEditing}
                        {...register('theme')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor={theme.id} className="ml-2 block text-sm font-medium text-gray-700">
                        {theme.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notifications
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'email', label: 'Email' },
                    { id: 'sms', label: 'SMS' },
                    { id: 'push', label: 'Push Notifications' },
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center">
                      <input
                        id={notification.id}
                        type="checkbox"
                        disabled={!isEditing}
                        {...register(`notifications.${notification.id as 'email' | 'sms' | 'push'}`)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={notification.id} className="ml-2 block text-sm font-medium text-gray-700">
                        {notification.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-3 bg-gray-50 text-right">
            {isEditing ? (
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Account</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your account settings and security.</p>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-500">Update your password regularly to keep your account secure.</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Change
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Enable
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-red-900">Delete Account</h4>
                <p className="text-sm text-gray-500">Permanently delete your account and all associated data.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
