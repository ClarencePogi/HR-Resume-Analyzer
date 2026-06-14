"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, UserCircle } from "lucide-react";
import { CurrentUser } from "@/types/auth";
import { useActionState, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Role } from "@/types/roles";
import { Preahvihear } from "next/font/google";
import { submit } from "@/app/settings/profile/action";
import { getError } from "@/lib/utils";

type FormState = {
  name: string
  email: string
  avatar: File | null
  role: string | null
  company_name: string | null
  company_email: string | null
}

export default function ProfileForm({ currentUser, roles }: { currentUser: CurrentUser, roles: Role[] }) {
    const [form, setForm] = useState<FormState>({
        name: currentUser.name ?? null,
        email: currentUser.email ?? null,
        avatar: null,
        role: null,
        company_name: null,
        company_email: null,
    })
    const [state, submitAction] = useActionState(submit, null);

    const [is_edit, setEdit] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // validate size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert("File too large. Max 2MB.")
            return
        }

        // validate type
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            alert("Only JPG, PNG or GIF allowed.")
            return
        }

        // store file in form state
        setForm(prev => ({ ...prev, avatar: file }))

        // generate preview URL
        const url = URL.createObjectURL(file)
        setPreview(url)
    }

    const [isDirty, setIsDirty] = useState(false)

    useEffect(() => {
        if (!is_edit) {
            setIsDirty(false)  // reset dirty on cancel
        }
    }, [is_edit])

    useEffect(() => {
        if (state) {
            setIsDirty(false)  // new state arrived, show errors again
        }
    }, [state])

    function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    return (
        <form action={submitAction}>
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                    {preview ? (
                        <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                        <UserCircle className="w-10 h-10 text-muted-foreground" />
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Profile Photo</span>
                    <InputGroup className="w-60">
                        <InputGroupInput 
                            disabled={!is_edit} 
                            className="cursor-pointer" 
                            accept="image/jpeg,image/png,image/gif" 
                            onChange={handleAvatarChange}
                            id="input-field-avatar" 
                            type="file" />
                    </InputGroup>
                    <FieldDescription>JPG, PNG or GIF. Max size 2MB.</FieldDescription>
                </div>
            </div>

            {/* Personal Info */}
            <div className="flex flex-col gap-2">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider">Personal</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="input-field-fullname">Full name</FieldLabel>
                        <Input 
                            name="name"
                            value={form.name} 
                            onChange={(e) => handleChange('name', e.target.value)} 
                            readOnly={!is_edit}
                            id="input-field-fullname" 
                            type="text" 
                            placeholder="Enter your full name" />
                        { getError(state, "name") && <p className="text-xs text-rose-400">{getError(state, "name")}</p> }
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
                        <Input 
                            name="email"
                            value={form.email} 
                            onChange={(e) => handleChange('email', e.target.value)} 
                            readOnly={!is_edit}
                            id="input-field-email" 
                            type="email" 
                            placeholder="Enter your email" />
                        { getError(state, "email") && <p className="text-xs text-rose-400">{getError(state, "email")}</p> }

                    </Field>
                    <Field className="relative">
                        <FieldLabel htmlFor="input-field-role">Role</FieldLabel>
                        <Select name="role" value={form.role ?? undefined} onValueChange={(value) => handleChange('role', value)} disabled={!is_edit}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    { roles.map((role, index) => (
                                        <SelectItem key={index} value={role.id.toString()}>{role.name}</SelectItem>
                                    )) }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        { getError(state, "role") && <p className="text-xs text-rose-400">{getError(state, "role")}</p> }
                    </Field>
                </div>
            </div>

            {/* Company Info */}
            <div className="flex flex-col gap-2 py-4">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider">Company</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="input-field-company">Company name</FieldLabel>
                        <Input 
                            name="company_name"
                            value={form.company_name ?? ''}
                            onChange={(e) => handleChange('company_name', e.target.value)}
                            readOnly={!is_edit}
                            id="input-field-company" 
                            type="text" 
                            placeholder="Enter your company name" />
                        { getError(state, "company_name") && <p className="text-xs text-rose-400">{getError(state, "company_name")}</p> }
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="input-field-company-email">Company email</FieldLabel>
                        <Input 
                            name="company_email"
                            value={form.company_email ?? ''}
                            onChange={(e) => handleChange('company_email', e.target.value)}
                            readOnly={!is_edit}
                            id="input-field-company-email" 
                            type="email" 
                            placeholder="Enter your company email" />
                        { getError(state, "company_email") && <p className="text-xs text-rose-400">{getError(state, "company_email")}</p> }
                    </Field>
                </div>
            </div>

            {/* Save */}
            
            <div className="flex justify-end border-t border-border pt-4 gap-2">
                {is_edit ? (
                    <>
                        <Button type="button" variant="outline" onClick={() => setEdit(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save changes
                        </Button>
                    </>
                ) : (
                    <Button type="button" onClick={() => setEdit(true)}>
                        Edit
                    </Button>
                )}
            </div>
            
        </form>
    );
}