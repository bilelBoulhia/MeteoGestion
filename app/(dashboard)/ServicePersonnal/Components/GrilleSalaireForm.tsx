'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import {useMutation, useQuery} from '@tanstack/react-query'
import axios from "axios"
import {Controller, useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import {useState, useEffect} from "react";

import Toast from "@/components/ui/toast";
import {baseapi} from "@/app/constants";


interface GrilleSalaire {
    NSS_EMPLOYE: string;
    Grd:string;
    BaseSalary: number;

}

const schema = yup.object({
    NSS_EMPLOYE: yup.string().required("Employee est obligatoire"),
    Grd: yup.string().required("grade est obligatoire"),
    BaseSalary: yup.number().required("salaire de base est obligatoire"),

}).required();

export default function GrilleSalaireForm() {
    const {
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<GrilleSalaire>({
        resolver: yupResolver(schema),
        defaultValues: {
            NSS_EMPLOYE: '',
            BaseSalary: 0,
            Grd: '',

        }
    })
    const { data: empData } = useQuery(
        ['emp'],
        {
            queryFn: async () => {
                const res = await  axios.get(`${baseapi}Employe/GetAllEmployes`);
                return res.data
            }
        }
    );
    const [selectedEmployee, setSelectedEmployee] = useState<string>('')
    useEffect(() => {
        setValue('NSS_EMPLOYE', selectedEmployee);
    }, [selectedEmployee, setValue]);



    const mutation = useMutation({
        mutationFn: async (data: GrilleSalaire) => {
            const formattedData = {
                NSS_EMPLOYE: data.NSS_EMPLOYE,
                Grd: data.Grd,
                BaseSalary: data.BaseSalary,

            };
            const res = await axios.post(
                `${baseapi}/api/Employe/CreateGrilleSalaire`,
                formattedData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return res.data;
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data, {
            onSuccess: () => {
                reset();
                setSelectedEmployee('');
                },
            onError: (error) => {
                console.error("Submission error:", error);
            },
        })
    })


    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <form onSubmit={onSubmit} className="max-w-3xl mx-auto space-y-8 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                <div className="border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                        Grille salaire
                    </h1>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2 p-1">
                        <Label htmlFor="NSS_EMPLOYE" className="font-medium">Employee</Label>
                        <Controller
                            name="NSS_EMPLOYE"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={(value) => {
                                    setSelectedEmployee(value);
                                    field.onChange(value);
                                }}>
                                    <SelectTrigger className="w-full rounded-[0.5rem] border-gray-300">
                                        <SelectValue placeholder="Select an employee"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Employees</SelectLabel>
                                            {empData && empData.map((employee: any) => (
                                                <SelectItem key={employee.nss} value={employee.nss.toString()}>
                                                    {employee.nom} {employee.prenom}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.NSS_EMPLOYE && (
                            <p className="text-red-500 text-sm mt-1">{errors.NSS_EMPLOYE.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 p-1">
                            <Label htmlFor="BaseSalary" className="font-medium">Base Salarier</Label>
                            <Controller
                                name="BaseSalary"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="BaseSalary"
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter le Salaire de base"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                )}
                            />
                            {errors.BaseSalary && (
                                <p className="text-red-500 text-sm mt-1">{errors.BaseSalary.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 p-1">
                            <Label htmlFor="Grd" className="font-medium">Grade</Label>
                            <Controller
                                name="Grd"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="Grd"
                                        type='text'
                                        placeholder="Enter le Grade"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                            {errors.Grd && (
                                <p className="text-red-500 text-sm mt-1">{errors.Grd.message}</p>
                            )}
                        </div>


                    </div>



                    <Button
                        type="submit"
                        className="w-full rounded-[0.5rem] bg-black"
                        variant='secondary'
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>

            {mutation.isError && (
                <Toast show={true} message="Error dans le server, essayer plus tard,"/>
            )}
            {mutation.isSuccess && (
                <Toast show={true} message="Grille de salaire a été ajouté"/>
            )}
        </div>
    )
}