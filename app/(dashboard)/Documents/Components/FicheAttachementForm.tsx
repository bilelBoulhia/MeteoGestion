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


interface FicheAttachementData {
    EmployeeID: string;
    Remboursement: number;
    Month: number;
    Year: number;
    Pri: number;
    Prc: number;
}

const schema = yup.object({
    EmployeeID: yup.string().required("Employee est obligatoire"),
    Remboursement: yup.number().required("remboursement est obligatoire"),
    Month: yup.number().required("moins est obligatoire").min(1).max(12),
    Year: yup.number().required("l'anne est obligatoire").min(1900).max(2100),
    Pri: yup.number()
        .required("Priorité est obligatoire")
        .max(10, "Priorité doit être au plus 10"),
    Prc: yup
        .number()
        .required("Prix est obligatoire")
        .max(30, "Prix doit être au plus 30"),
}).required();

export default function FAForm() {
    const {
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<FicheAttachementData>({
        resolver: yupResolver(schema),
        defaultValues: {
            EmployeeID: '',
            Remboursement: 0,
            Month: 1,
            Year: Number(new Date().getFullYear()),
            Pri: 0,
            Prc: 0
        }
    })

    const { data: empData } = useQuery(
        ['emp'],
        {
            queryFn: () => fetchData('Employe/GetAllEmployes'),
        }
    );

    const [selectedEmployee, setSelectedEmployee] = useState<string>('')
    const [selectedMonth, setSelectedMonth] = useState('')
    const [selectedYear, setSelectedYear] = useState('')

    useEffect(() => {
        setValue('EmployeeID', selectedEmployee);
    }, [selectedEmployee, setValue]);

    useEffect(() => {
        if (selectedMonth) {
            setValue('Month', parseInt(selectedMonth));
        }
        if (selectedYear) {
            setValue('Year', parseInt(selectedYear));
        }
    }, [selectedMonth, selectedYear, setValue]);

    const mutation = useMutation({
        mutationFn: async (data: FicheAttachementData) => {
            const formattedData = {
                EmployeeID: data.EmployeeID,
                Remboursement: data.Remboursement,
                Month: data.Month,
                Year: data.Year,
                Pri: data.Pri,
                Prc: data.Prc

            };
            const res = await axios.post(
                'http://localhost:5007/api/Document/PostEmployeFA',
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
                setSelectedMonth('');
                setSelectedYear('');
            },
            onError: (error) => {
                console.error("Submission error:", error);
            },
        })
    })

    const handleMonthYearChange = (month: string, year: string) => {
        setSelectedMonth(month)
        setSelectedYear(year)
    }

    return (
        <div className="  py-12 px-4 sm:px-6 lg:px-8">
            <form onSubmit={onSubmit} className="max-w-3xl mx-auto space-y-8 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                <div className="border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                        Fiche d'attachement
                    </h1>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2 p-1">
                        <Label htmlFor="EmployeeID" className="font-medium">Employee</Label>
                        <Controller
                            name="EmployeeID"
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
                        {errors.EmployeeID && (
                            <p className="text-red-500 text-sm mt-1">{errors.EmployeeID.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 p-1">
                            <Label htmlFor="Remboursement" className="font-medium">Remboursement</Label>
                            <Controller
                                name="Remboursement"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="Remboursement"
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter le remboursement"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                )}
                            />
                            {errors.Remboursement && (
                                <p className="text-red-500 text-sm mt-1">{errors.Remboursement.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 p-1">
                            <Label htmlFor="Prc" className="font-medium">PRC</Label>
                            <Controller
                                name="Prc"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="prc"
                                        type="number"
                                        placeholder="Enter PRC"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                )}
                            />
                            {errors.Prc && (
                                <p className="text-red-500 text-sm mt-1">{errors.Prc.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 p-1">
                            <Label htmlFor="Pri" className="font-medium">PRI</Label>
                            <Controller
                                name="Pri"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        id="pri"
                                        type="number"
                                        placeholder="Enter PRI"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                )}
                            />
                            {errors.Pri && (
                                <p className="text-red-500 text-sm mt-1">{errors.Pri.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 items-center justify-center flex w-full">
                        <MonthYearPicker onChange={handleMonthYearChange}/>
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
                <Toast show={true} message="Form d'attachement a été ajouté"/>
            )}
        </div>
    )
}