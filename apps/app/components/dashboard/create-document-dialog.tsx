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
  type: z.enum(['text', 'canvas', 'whiteboard']),
  name: z.string().min(1, 'Document name is required'),
  isPrivate: z.boolean(),
});

type CreateDocumentForm = z.infer<typeof createDocumentSchema>;

export default function CreateDocumentDialog({
  children,
}: CreateDocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<'create' | 'settings'>('create');
  const { user } = useUser();
  const { organization } = useOrganization();

  if (!user) {
    return null;
  }

  const form = useForm<CreateDocumentForm>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      type: 'text',
      name: '',
      isPrivate: false,
    },
  });

  const { isPrivate, type, name } = form.watch();

  const onSubmit = async (values: CreateDocumentForm) => {
    try {
      if (values.isPrivate) {
        setPage('settings');
      } else {
        if (!organization) {
          return;
        }

        const userAccesses = (await organization.getMemberships()).data
          .map((m) => m.publicUserData.userId)
          .filter(
            (userId): userId is string =>
              userId !== undefined && userId !== user.id
          );

        await createDocument({
          name: values.name,
          type: values.type,
          userId: user.id,
          userAccesses,
          groupIds: [organization.id],
        });
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.error('Failed to create document:', error);
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
                        {[
                          { value: 'text', label: 'Text', Icon: TextFontIcon },
                          {
                            value: 'canvas',
                            label: 'Canvas',
                            Icon: CanvasIcon,
                          },
                          {
                            value: 'whiteboard',
                            label: 'Whiteboard',
                            Icon: NoteIcon,
                          },
                        ].map(({ value, label, Icon }) => (
                          <FormItem
                            key={value}
                            className={cn(
                              'flex cursor-pointer items-center justify-between gap-2 rounded-md bg-background p-4',
                              type === value && 'bg-muted'
                            )}
                            onClick={() => field.onChange(value)}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="size-5 text-muted-foreground" />
                              <Label>{label}</Label>
                            </div>
                            <RadioGroupItem
                              value={value}
                              id={value}
                              checked={type === value}
                            />
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
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
                    <Input
                      placeholder="Untitled"
                      className="border-none bg-background focus-visible:ring-1"
                      {...field}
                    />
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
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={!name}>
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
