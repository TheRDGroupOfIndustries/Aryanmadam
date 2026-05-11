$files = Get-ChildItem -Path "." -Recurse -Include "*.tsx" | Where-Object { $_.FullName -notlike "*node_modules*" }

$oldClass1 = 'className="font-bold min-h-[2.5rem] line-clamp-2 hover:text-[#e6cfa7] transition-colors"'
$newClass1 = 'className="font-bold capitalize min-h-[2.5rem] line-clamp-2 hover:text-[#e6cfa7] transition-colors"'

$oldClass2 = 'className="font-bold text-[rgb(44_95_124)] min-h-[2.5rem] line-clamp-2 leading-tight hover:text-[#e6cfa7] transition-colors cursor-pointer"'
$newClass2 = 'className="font-bold capitalize text-[rgb(44_95_124)] min-h-[2.5rem] line-clamp-2 leading-tight hover:text-[#e6cfa7] transition-colors cursor-pointer"'

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $newContent = $content.Replace($oldClass1, $newClass1).Replace($oldClass2, $newClass2)
    if ($newContent -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent)
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Done."
