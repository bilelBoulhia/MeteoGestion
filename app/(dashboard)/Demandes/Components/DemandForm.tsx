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

import {fetchData} from "@/app/api/actions";
import {useState, useEffect} from "react";
import {MonthYearPicker} from "@/components/ui/components_month-year-picker";
import Toast from "@/components/ui/toast";
import {Textarea} from "@/components/ui/textarea";


interface DemandData {
    EmployeId: string;
    TypeChangement: string;
    Raison: string;
    Statut: string;

    Commentaires: string;

}

const schema = yup.object({
    EmployeId: yup.string().required("Employee est obligatoire"),
    TypeChangement: yup.string().required('Type changement est obligatoire'),
    Raison: yup.string().required('Raison est obligatoire'),
    Statut: yup.string().required('Statut obligatoire'),
    Commentaires: yup.string().required('Commenta obligatoire'),
});

export default function DemandForm() {
    const {
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<DemandData>({
        resolver: yupResolver(schema),
        defaultValues: {
            EmployeId: '',
            TypeChangement:'',
            Raison:'',
            Statut:'',
            Commentaires:'',
        }
    })

    const { data: empData } = useQuery(
        ['emp'],
        {
            queryFn: () => fetchData('Employe/GetAllEmployes'),
        }
    );

    const [selectedEmployee, setSelectedEmployee] = useState<string>('')
    useEffect(() => {
        setValue('EmployeId', selectedEmployee);
    }, [selectedEmployee, setValue]);



    const mutation = useMutation({
        mutationFn: async (data: DemandData) => {
            const formattedData = {
                "employeId": data.EmployeId,
                "typeChangement": data.TypeChangement,
                "raison": data.Raison,
                "dateDemande": new Date(),
                "statut": data.Statut,
                "commentaires": data.Commentaires
            };
            const res = await axios.post(
                'http://localhost:5007/api/Document/PostDemendeChangemnt',
                formattedData,
                {
                    headers: {
                        'Content-Type': 'application/json'
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
        <div className="  py-12 px-4 sm:px-6 lg:px-8">
            <form onSubmit={onSubmit}
                  className="max-w-3xl mx-auto space-y-8 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                <div className="border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                        Demand de changement
                    </h1>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2 p-1">
                        <Label htmlFor="EmployeeID" className="font-medium">Employee</Label>
                        <Controller
                            name="EmployeId"
                            control={control}
                            render={({field}) => (
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
                        {errors.EmployeId && (
                            <p className="text-red-500 text-sm mt-1">{errors.EmployeId.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 p-1">
                            <Label htmlFor="Raison" className="font-medium">Raison</Label>
                            <Controller
                                name="Raison"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="Raison"
                                        step="0.01"
                                        placeholder="Enter le Raison"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                            {errors.Raison && (
                                <p className="text-red-500 text-sm mt-1">{errors.Raison.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 p-1">
                            <Label htmlFor="type de changement" className="font-medium">type de changement</Label>
                            <Controller
                                name="TypeChangement"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="TypeChangement"

                                        placeholder="Enter le type de changement"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                            {errors.TypeChangement && (
                                <p className="text-red-500 text-sm mt-1">{errors.TypeChangement.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 p-1">
                            <Label htmlFor="statut" className="font-medium">status</Label>
                            <Controller
                                name="Statut"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="statut"

                                        placeholder="Enter statut"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                            {errors.Statut && (
                                <p className="text-red-500 text-sm mt-1">{errors.Statut.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 p-1">
                        <Label htmlFor="Commentaires" className="font-medium">Commentaires</Label>
                        <Controller
                            name="Commentaires"
                            control={control}
                            render={({field}) => (
                                <Textarea
                                    id="Commentaires"

                                   placeholder="Enter commentaires"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                        {errors.Commentaires && (
                            <p className="text-red-500 text-sm mt-1">{errors.Commentaires.message}</p>
                        )}
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

    {
        mutation.isError && (
            <Toast show={true} message="Error dans le server, essayer plus tard,"/>
        )
    }
    {
        mutation.isSuccess && (
            <Toast show={true} message="Form d'attachement a été ajouté"/>
        )
    }
</div>
)
}