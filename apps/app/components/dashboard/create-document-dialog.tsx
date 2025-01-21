'use client';

import { createDocument } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrganization, useUser } from '@interiorly/auth/client';
import { Button } from '@interiorly/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@interiorly/design-system/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@interiorly/design-system/components/ui/form';
import { Input } from '@interiorly/design-system/components/ui/input';
import { Label } from '@interiorly/design-system/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@interiorly/design-system/components/ui/radio-group';
import { Switch } from '@interiorly/design-system/components/ui/switch';
import { cn } from '@interiorly/design-system/lib/utils';
import {
  CanvasIcon,
  NoteIcon,
  SquareLock02Icon,
  TextFontIcon,
} from 'hugeicons-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CreateDocumentDialogProps {
  children: ReactNode;
}

const createDocumentSchema = z.object({
  type: z.enum(['text', 'canvas', 'whiteboard'], {
    required_error: 'You need to select a document type.',
  }),
  name: z.string().min(1, 'Document name is required'),
  isPrivate: z.boolean(),
});

type CreateDocumentForm = z.infer<typeof createDocumentSchema>;

export default function CreateDocumentDialog({
  children,
}: CreateDocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<'create' | 'settings'>('create');
  const { user } = useUser();
  const { organization } = useOrganization();

  const form = useForm<CreateDocumentForm>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      type: 'text',
      name: `${user?.firstName || user?.username}'s Document`,
      isPrivate: false,
    },
  });

  if (!user) {
    return null;
  }

  const { isPrivate, type, name } = form.watch();

  const onSubmit = async (values: CreateDocumentForm) => {
    setIsLoading(true);
    try {
      if (values.isPrivate) {
        setPage('settings');
      } else {
        if (!organization) {
          console.log('No organization');

          return;
        }

        await createDocument(
          {
            name: values.name,
            type: values.type,
            userId: user.id,
            userAccesses: [user.id, 'user_2r2CZbil4Kx8MQ81g3eWg45OvM8'],
            groupIds: [organization.id],
          },
          true
        );
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.error('Failed to create document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (page === 'settings') {
      setPage('create');
    } else {
      setOpen(false);
      form.reset();
    }
  };

  const documentTypes = [
    {
      value: 'text',
      label: 'Text Editor',
      description:
        'Write and format documents with rich text, images and embeds',
      Icon: TextFontIcon,
    },
    {
      value: 'canvas',
      label: 'Canvas',
      description:
        'Draw and sketch freely with a digital canvas and drawing tools',
      Icon: CanvasIcon,
    },
    {
      value: 'whiteboard',
      label: 'Whiteboard',
      description:
        'Take notes and organize thoughts with a simple writing surface',
      Icon: NoteIcon,
    },
  ];

  const currentDocumentType = documentTypes.find(({ value }) => value === type);
  const currentDocumentTypeIcon = currentDocumentType ? (
    <currentDocumentType.Icon className="size-5 text-secondary-foreground" />
  ) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 rounded-t-lg bg-secondary p-4">
              <DialogTitle className="text-xl">Create Document</DialogTitle>
              <DialogDescription className="-mt-4">
                in Workspace
              </DialogDescription>

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-secondary-foreground text-xs">
                      Document Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {documentTypes.map(
                          ({ value, label, description, Icon }) => (
                            <FormItem
                              key={value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <div
                                  className={cn(
                                    'group flex w-full cursor-pointer items-center justify-between gap-2 rounded-md bg-background p-4 transition-colors',
                                    field.value === value && 'bg-muted'
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <Icon className="size-[22px] text-muted-foreground transition-colors group-hover:text-foreground" />
                                    <div className="flex flex-col gap-1">
                                      <Label className="cursor-pointer font-normal transition-colors group-hover:text-foreground">
                                        {label}
                                      </Label>
                                      <span className="text-muted-foreground text-xs">
                                        {description}
                                      </span>
                                    </div>
                                  </div>
                                  <RadioGroupItem value={value} />
                                </div>
                              </FormControl>
                            </FormItem>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-secondary-foreground text-xs">
                      Document Name
                    </FormLabel>
                    <div className="relative flex items-center rounded-md bg-background px-2 focus-within:ring-1 focus-within:ring-border">
                      {currentDocumentTypeIcon}
                      <Input
                        placeholder="Untitled"
                        className="items-center border-none bg-transparent px-1.5 pt-2 text-muted-foreground focus-visible:ring-0"
                        {...field}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between bg-secondary pt-2">
                    <div className="flex flex-col items-start justify-start gap-1">
                      <FormLabel className="flex items-center gap-1">
                        <SquareLock02Icon className="size-4" />
                        <span className="text-sm">Private Document</span>
                      </FormLabel>
                      <span className="text-muted-foreground text-xs">
                        Only selected members can access this document.
                      </span>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="rounded-b-lg bg-background p-4">
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!name || isLoading}>
                  {isPrivate ? 'Next' : 'Create'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
