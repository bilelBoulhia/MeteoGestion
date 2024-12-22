'use client'

import { useState, useEffect } from 'react'
import { propType } from "@/app/(dashboard)/Pointage/page"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchData } from "@/app/api/actions"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Toast from "@/components/ui/toast"
import axios from "axios"

export default function PointageFormView(props: propType) {
    const { data } = useQuery(
        ['Emps'],
        {
            queryFn: () => fetchData('Employe/GetAllEmployes'),
            initialData: props.data,
        }
    )

    const [selectedEmployee, setSelectedEmployee] = useState<string>('')
    const [currentTime, setCurrentTime] = useState(new Date())
    const [responseMessage, setResponseMessage] = useState<string | null>(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const mutation = useMutation({
        mutationFn: async (employeeID: string) => {
            const response = await axios.post(
                'https://localhost:44376/api/Pointage/PostPointage',
                JSON.stringify(employeeID),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            return response.data
        },
        onSuccess: (data) => {
            setResponseMessage(data.message || 'Pointage successful!')
        },
        onError: (error: any) => {
            setResponseMessage(error.response?.data?.message || 'Pointage failed. Please try again.')
        },
    })

    const handlePointage = () => {
        if (selectedEmployee) {
            mutation.mutate(selectedEmployee)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Pointage Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-3xl font-semibold">
                                {currentTime.toLocaleTimeString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                {currentTime.toLocaleDateString()}
                            </p>
                        </div>
                        <Select onValueChange={setSelectedEmployee}>
                            <SelectTrigger className="w-full rounded-xl">
                                <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Employees</SelectLabel>
                                    {data && data.map((employee: any) => (
                                        <SelectItem key={employee.nss} value={employee.nss.toString()}>
                                            {employee.nom} {employee.prenom}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            className="w-full rounded-[0.5rem]"
                            onClick={handlePointage}
                            disabled={mutation.isLoading || !selectedEmployee}
                        >
                            {mutation.isLoading ? 'Submitting...' : "Point l'employee"}
                        </Button>

                        {responseMessage && (
                            <Toast message={responseMessage} show={true} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
