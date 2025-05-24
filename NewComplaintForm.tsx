
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ComplaintType, Department } from '@/types';
import { Camera, X, Upload } from 'lucide-react';

// Form schema validation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title must not exceed 100 characters."
  }),
  departmentId: z.string({
    required_error: "Please select a department.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters."
  }).max(1000, {
    message: "Description must not exceed 1000 characters."
  }),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    required_error: "Please select a priority level.",
  }),
  address: z.string().optional(),
  subjectName: z.string().optional(),
  subjectEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  subjectPhone: z.string().optional(),
});

interface NewComplaintFormProps {
  complaintType: ComplaintType | null;
  setComplaintType: (type: ComplaintType | null) => void;
  departments: Department[];
  onSubmit: (data: any) => void;
  initialData?: any;
}

const NewComplaintForm: React.FC<NewComplaintFormProps> = ({
  complaintType,
  setComplaintType,
  departments,
  onSubmit,
  initialData = {}
}) => {
  const [mediaUrls, setMediaUrls] = React.useState<string[]>([]);
  
  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || '',
      departmentId: initialData.departmentId || '',
      description: initialData.description || '',
      priority: initialData.priority || 'medium',
      address: initialData.address_manual || '',
      subjectName: initialData.subjectDetails?.name || '',
      subjectEmail: initialData.subjectDetails?.providedContactEmail || '',
      subjectPhone: initialData.subjectDetails?.providedContactPhone || '',
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls = Array.from(e.target.files).map(
        (_, index) => `https://placehold.co/600x400?text=Image+${mediaUrls.length + index + 1}`
      );
      setMediaUrls([...mediaUrls, ...newUrls]);
    }
  };
  
  const removeImage = (index: number) => {
    const newUrls = [...mediaUrls];
    newUrls.splice(index, 1);
    setMediaUrls(newUrls);
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    // Add mediaUrls to the form data
    const formData = {
      ...values,
      complaintType,
      mediaUrls,
    };
    
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Complaint Details</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Complaint Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Brief title describing the issue" 
                      {...field} 
                      className="focus:ring-2 focus:ring-aavaaz-navy/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Department */}
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority Level</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose based on the urgency of your complaint.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Subject Details for Individual Complaints */}
        {complaintType === 'individual' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Subject Information</h2>
              <p className="text-sm text-gray-500 mt-1">
                Please provide details about the individual involved in this complaint.
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Warning / Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                <p className="text-amber-800 text-sm">
                  <strong>Important:</strong> Filing a complaint against an individual is a serious matter. Please ensure all information provided is factual and accurate. False complaints may have legal consequences.
                </p>
              </div>
              
              {/* Subject Name */}
              <FormField
                control={form.control}
                name="subjectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Full name of the individual" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Subject Email */}
              <FormField
                control={form.control}
                name="subjectEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject Email <span className="text-muted-foreground text-sm">(if known)</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="example@email.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Subject Phone */}
              <FormField
                control={form.control}
                name="subjectPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject Phone <span className="text-muted-foreground text-sm">(if known)</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 234 567 8900" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        
        {/* Description */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Detailed Description</h2>
          </div>
          
          <div className="p-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide as much detail as possible about the issue..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include relevant dates, times, locations, and any previous actions taken.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Location */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Location Information</h2>
          </div>
          
          <div className="p-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the location details..."
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide the exact location where the issue occurred.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <p className="text-sm text-muted-foreground flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Map selection feature will be available in a future update.
              </p>
            </div>
          </div>
        </div>
        
        {/* Media Uploads */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Supporting Evidence</h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload photos or documents that help describe the issue (optional).
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Media preview */}
            {mediaUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {mediaUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Upload ${index + 1}`} 
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> photos or documents
                  </p>
                  <p className="text-xs text-gray-500 mt-1">(PNG, JPG, PDF up to 10MB)</p>
                </div>
                <input 
                  id="fileUpload" 
                  type="file" 
                  className="hidden" 
                  multiple 
                  accept="image/*,application/pdf"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>
        
        {/* Submission */}
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setComplaintType(null)}
            className="border-aavaaz-navy text-aavaaz-navy hover:bg-aavaaz-navy/5"
          >
            Back
          </Button>
          <Button 
            type="submit"
            className="bg-aavaaz-navy hover:bg-aavaaz-navy/90"
          >
            Submit Complaint
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewComplaintForm;
