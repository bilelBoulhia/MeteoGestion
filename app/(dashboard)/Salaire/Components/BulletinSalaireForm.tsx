'use client'
import { Button } from "@/components/ui/button"
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


interface BulletinData {
    NSS_EMPLOYE: string;
    Month: number;
    Year: number;

}

const schema = yup.object({
    NSS_EMPLOYE: yup.string().required("Employee est obligatoire"),
    Month: yup.number().required("moins est obligatoire").min(1).max(12),
    Year: yup.number().required("l'anne est obligatoire").min(1900).max(2100),

}).required();

export default function BulletinSalaireForm() {
    const {
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<BulletinData>({
        resolver: yupResolver(schema),
        defaultValues: {
            NSS_EMPLOYE: '',
            Month: Number(new Date().getMonth()),
            Year: Number(new Date().getFullYear()),

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
        setValue('NSS_EMPLOYE', selectedEmployee);
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
        mutationFn: async (data: BulletinData) => {
            const formattedData = {
                NSS_EMPLOYE: data.NSS_EMPLOYE,
                Month: data.Month,
                Year: data.Year,


            };
            const res = await axios.post(
                'http://localhost:5007/api/Salary/CreateBulletinSalaire',
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
                console.log(data)
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
                       Bulletin salairee
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


                    <div className="pt-4 items-center justify-center flex w-full">
                        <MonthYearPicker onChange={handleMonthYearChange}/>
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-[0.5rem] bg-black"
                        variant='secondary'
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? 'attend...' : 'Genere'}
                    </Button>
                </div>
            </form>

            {mutation.isError && (
                <Toast show={true} message="Erreur dans le server,creer la fiche d'attachement d'abord"/>
            )}
            {mutation.isSuccess && (
                <Toast show={true} message="Bulletin a été generer"/>
            )}
        </div>
    )
}