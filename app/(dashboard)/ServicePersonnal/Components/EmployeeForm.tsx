'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {  PlusIcon, XIcon } from 'lucide-react'

import { useMutation } from '@tanstack/react-query'
import axios from "axios"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Toast from '@/components/ui/toast'
import {DatePicker} from "@nextui-org/date-picker";

const schema = yup.object({
    NSS: yup.string().required("NSS is required"),
    Nom: yup.string().required("Nom is required"),
    Prenom: yup.string().required("Prénom is required"),
    DateNaissance: yup.date().required("Date de naissance is required"),
    LieuNaissance: yup.string().required("Lieu de naissance is required"),
    Sexe: yup.number().oneOf([0, 1], "Sexe must be 0 (Male) or 1 (Female)").required("Sexe is required"),
    SituationFamiliale: yup
        .number()
        .oneOf([0, 1, 2, 3], "Invalid situation familiale")
        .required("Situation familiale is required"),
    Adresse: yup.string().required("Adresse is required"),
    DateRecrutement: yup.date().required("Date de recrutement is required"),
    FonctionPrincipale: yup.string().required("Fonction principale is required"),
    Grade: yup.string().required("Grade is required"),
    NombreEnfants: yup
        .number()
        .min(0, "Nombre d'enfants cannot be negative")
        .required("Nombre d'enfants is required"),
    Categorie: yup.string().required("Catégorie is required"),
    Section: yup.string().required("Section is required"),
    TauxIndemniteNuisance: yup
        .number()
        .min(0, "Taux indemnité nuisance must be positive")
        .required("Taux indemnité nuisance is required"),
    PrimeVariable: yup
        .number()
        .min(0, "Prime variable must be positive")
        .required("Prime variable is required"),
    EmployeResponsabilites: yup
        .array()
        .of(yup.string().required("Responsabilité is required"))
        .required("Employe responsabilités is required"),
}).required();

export default function EmployeeForm() {
    const [responsabilites, setResponsabilites] = useState<string[]>([])


    const respMap=[
        {value:'1',text:'Responsable de poste'},
        {value:'2',text:'Responsable de formation'},
        {value:'3',text:'chef service'},
        {value:'4',text:'Chef de project'},
        {value:'5',text:'Chef de deparetement'},
        {value:'6',text:'CResponsable de la relation exterieure'},
        {value:'7',text:'President de commission des oeuvres sociales'}
    ]

    const [newResponsabilite, setNewResponsabilite] = useState('')

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            NSS: '',
            Nom: '',
            Prenom: '',
            DateNaissance: undefined,
            LieuNaissance: '',
            Sexe: undefined,
            SituationFamiliale: undefined,
            Adresse: '',
            DateRecrutement: undefined,
            FonctionPrincipale: '',
            Grade: '',
            NombreEnfants: 0,
            Categorie: '',
            Section: '',
            TauxIndemniteNuisance: 0,
            PrimeVariable: 0,
            EmployeResponsabilites: [],
        }
    })

    const mutation = useMutation({
        mutationFn: (data: any) => {
            return axios.post('http://localhost:5007/api/Employe/CreateEmploye', data)
        }
    })

    const addResponsabilite = () => {
        if (newResponsabilite.trim() && responsabilites.length < 3) {
            setResponsabilites([...responsabilites, newResponsabilite.trim()])
            setNewResponsabilite('')
        }
    }

    const removeResponsabilite = (index: number) => {
        setResponsabilites(responsabilites.filter((_, i) => i !== index))
    }

    const onSubmit = handleSubmit((data) => {
        const payload = {
            ...data,
            EmployeResponsabilites: responsabilites,
        }
        mutation.mutate(payload,{
            onSuccess: () => {
                reset();
                setResponsabilites([]);
            },
            onError: (error) => {
                console.error("Submission error:", error);
            },
        })
    })


    return (
        <div className="min-h-screen  p-8">
            <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-8 bg-white shadow-lg rounded-[0.5rem] p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Employee Form</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 p-1">
                        <Label htmlFor="NSS">NSS</Label>
                        <Controller
                            name="NSS"
                            control={control}
                            render={({field}) => (
                                <Input id="NSS" placeholder="Enter NSS" {...field} />
                            )}
                        />
                        {errors.NSS && <p className="text-red-500 text-sm">{errors.NSS.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="Nom">Nom</Label>
                        <Controller
                            name="Nom"
                            control={control}
                            render={({field}) => (
                                <Input id="Nom" placeholder="Enter nom" {...field} />
                            )}
                        />
                        {errors.Nom && <p className="text-red-500 text-sm">{errors.Nom.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="Prenom">Prénom</Label>
                        <Controller
                            name="Prenom"
                            control={control}
                            render={({field}) => (
                                <Input id="Prenom" placeholder="Enter prénom" {...field} />
                            )}
                        />
                        {errors.Prenom && <p className="text-red-500 text-sm">{errors.Prenom.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label>Date de Naissance</Label>
                        <Controller
                            name="DateNaissance"
                            control={control}
                            render={({field}) => (

                                <DatePicker
                                    aria-label="Pick a date"
                                    // @ts-ignore
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Pick a date"
                                    isClearable

                                />
                            )}
                        />
                        {errors.DateNaissance && <p className="text-red-500 text-sm">{errors.DateNaissance.message}</p>}
                    </div>


                    <div className="space-y-2 p-1">
                        <Label htmlFor="Sexe">Sexe</Label>
                        <Controller
                            name="Sexe"
                            control={control}
                            render={({field}) => (
                                <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                    <SelectTrigger className='border-neutral-300 shadow-lg'>
                                        <SelectValue placeholder="Select sexe"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Masculin</SelectItem>
                                        <SelectItem value="1">Féminin</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.Sexe && <p className="text-red-500 text-sm">{errors.Sexe.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="SituationFamiliale">Situation Familiale</Label>
                        <Controller
                            name="SituationFamiliale"
                            control={control}
                            render={({field}) => (
                                <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                    <SelectTrigger className='border-neutral-300 shadow-lg'>
                                        <SelectValue placeholder="Select situation"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Célibataire</SelectItem>
                                        <SelectItem value="1">Marié(e)</SelectItem>
                                        <SelectItem value="2">Divorcé(e)</SelectItem>
                                        <SelectItem value="3">Veuf/Veuve</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.SituationFamiliale &&
                            <p className="text-red-500 text-sm">{errors.SituationFamiliale.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="Adresse">Adresse</Label>
                        <Controller
                            name="Adresse"
                            control={control}
                            render={({field}) => (
                                <Input id="Adresse" placeholder="Enter adresse" {...field} />
                            )}
                        />
                        {errors.Adresse && <p className="text-red-500 text-sm">{errors.Adresse.message}</p>}
                    </div>
                    <div className="space-y-2 p-1">
                        <Label htmlFor="LieuNaissance">Lieu de Naissance</Label>
                        <Controller
                            name="LieuNaissance"
                            control={control}
                            render={({field}) => (
                                <Input id="LieuNaissance" placeholder="Enter lieu de naissance" {...field} />
                            )}
                        />
                        {errors.LieuNaissance && <p className="text-red-500 text-sm">{errors.LieuNaissance.message}</p>}
                    </div>
                    <div className="space-y-2 p-1">
                        <Label>Date de Recrutement</Label>
                        <Controller
                            name="DateRecrutement"
                            control={control}
                            render={({field}) => (
                                <div className="w-full">
                                    // @ts-ignore
                                    <DatePicker
                                        aria-label="Pick a date"
                                        // @ts-ignore
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Pick a date"
                                        isClearable

                                    />
                                </div>
                            )}
                        />
                        {errors.DateRecrutement &&
                            <p className="text-red-500 text-sm">{errors.DateRecrutement.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="FonctionPrincipale">Fonction Principale</Label>
                        <Controller
                            name="FonctionPrincipale"
                            control={control}
                            render={({field}) => (
                                <Input id="FonctionPrincipale" placeholder="Enter fonction principale" {...field} />
                            )}
                        />
                        {errors.FonctionPrincipale &&
                            <p className="text-red-500 text-sm">{errors.FonctionPrincipale.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="Grade">Grade</Label>
                        <Controller
                            name="Grade"
                            control={control}
                            render={({field}) => (
                                <Input id="Grade" placeholder="Enter grade" {...field} />
                            )}
                        />
                        {errors.Grade && <p className="text-red-500 text-sm">{errors.Grade.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="NombreEnfants">Nombre d'Enfants</Label>
                        <Controller
                            name="NombreEnfants"
                            control={control}
                            render={({field}) => (
                                <Input id="NombreEnfants" type="number"
                                       placeholder="Enter nombre d'enfants" {...field} />
                            )}
                        />
                        {errors.NombreEnfants && <p className="text-red-500 text-sm">{errors.NombreEnfants.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="Categorie">Catégorie</Label>
                        <Controller
                            name="Categorie"
                            control={control}
                            render={({field}) => (
                                <Input id="Categorie" placeholder="Enter catégorie" {...field} />
                            )}
                        />
                        {errors.Categorie && <p className="text-red-500 text-sm">{errors.Categorie.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="Section">Section</Label>
                        <Controller
                            name="Section"
                            control={control}
                            render={({field}) => (
                                <Input id="Section" placeholder="Enter section" {...field} />
                            )}
                        />
                        {errors.Section && <p className="text-red-500 text-sm">{errors.Section.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="TauxIndemniteNuisance">Taux Indemnité Nuisance</Label>
                        <Controller
                            name="TauxIndemniteNuisance"
                            control={control}
                            render={({field}) => (
                                <Input
                                    id="TauxIndemniteNuisance"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter taux"{...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            )}
                        />
                        {errors.TauxIndemniteNuisance &&
                            <p className="text-red-500 text-sm">{errors.TauxIndemniteNuisance.message}</p>}
                    </div>

                    <div className="space-y-2 p-1">
                        <Label htmlFor="PrimeVariable">Prime Variable</Label>
                        <Controller
                            name="PrimeVariable"
                            control={control}
                            render={({field}) => (
                                <Input
                                    id="PrimeVariable"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter prime variable"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            )}
                        />
                        {errors.PrimeVariable && <p className="text-red-500 text-sm">{errors.PrimeVariable.message}</p>}
                    </div>
                </div>

                <div className="space-y-2 p-1">
                    <Label>Responsabilités</Label>
                    <div className="flex space-x-2">
                        <Select onValueChange={(value) => setNewResponsabilite(value)}>
                            <SelectTrigger className='border-neutral-300 shadow-lg'>
                                <SelectValue placeholder="Select responsabilité"/>
                            </SelectTrigger>
                            <SelectContent>
                                {respMap.map((resp) => (
                                    <SelectItem key={resp.value} value={resp.value}>
                                        {resp.text}
                                    </SelectItem>
                                ))}
                            </SelectContent>

                        </Select>
                        <Button
                            type="button"
                            disabled={responsabilites.length >= 3}
                            onClick={addResponsabilite}
                            className="px-3 border-neutral-300 shadow-xl"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="space-y-2 mt-2 p-1">
                        {responsabilites.map((respValue, index) => {
                            const respText = respMap.find((resp) => resp.value === respValue)?.text || respValue;
                            return (
                                <div key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
                                    <span className="flex-grow">{respText}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeResponsabilite(index)}
                                        type="button"
                                    >
                                        <XIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            );
                        })}
                        {errors.EmployeResponsabilites && (
                            <p className="text-red-500 text-sm">{errors.EmployeResponsabilites.message}</p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full rounded-xl text-white"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? 'Submitting...' : 'Submit'}
                </Button>

                {mutation.isError && (
                    <Toast show={true} message='error dans le server , eassyer later' />
                )}

                {mutation.isSuccess && (
                    <Toast show={true} message='employee ont ete ajouter' />
                )}
            </form>
        </div>
    )
}

