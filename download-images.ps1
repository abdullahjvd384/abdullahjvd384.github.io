# download-images.ps1
# Downloads relevant high-resolution images from Unsplash Source into the project
# Usage: run in PowerShell from the project root:
#   cd 'C:\Users\Asadullah Javed\OneDrive\Desktop\AmericaPolicy'
#   .\download-images.ps1

Param(
    [switch]$ResizeWithImageMagick  # set this flag to run ImageMagick conversions (requires 'magick' in PATH)
)

# Create directories
$dirs = @('images','images/hero','images/articles','images/author')
foreach($d in $dirs){ if(-not (Test-Path $d)){ New-Item -ItemType Directory -Path $d | Out-Null } }

# Helper to download from Unsplash Source with keywords and resolution
function Get-UnsplashImage($keywords, $outPath, $width=1200, $height=675){
    $kw = [System.Uri]::EscapeDataString($keywords)
    $url = "https://source.unsplash.com/${width}x${height}/?${kw}"
    Write-Host "Downloading [$keywords] -> $outPath"
    try{
        Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -ErrorAction Stop
        Write-Host "Saved: $outPath"
    } catch {
        Write-Warning "Failed to download $url : $_"
    }
}

# Map of images to download. Adjust keywords if you prefer more specific images.
$images = @(
    @{ keywords = 'car insurance,auto insurance,car'; out='images/hero/auto-insurance-1200x675.jpg' },
    @{ keywords = 'mortgage,mortgage rates,house keys'; out='images/hero/mortgage-1200x675.jpg' },
    @{ keywords = 'law,gavel,legal books'; out='images/hero/legal-1200x675.jpg' },

    @{ keywords = 'auto insurance,car insurance,chart'; out='images/articles/auto-insurance-1200x675.jpg' },
    @{ keywords = 'home insurance,house,keys'; out='images/articles/homeowners-insurance-1200x675.jpg' },
    @{ keywords = 'life insurance,family,policy'; out='images/articles/life-insurance-1200x675.jpg' },
    @{ keywords = 'health insurance,open enrollment,forms'; out='images/articles/health-insurance-1200x675.jpg' },
    @{ keywords = 'save money,car calculator,insurance quote'; out='images/articles/lower-car-insurance-1200x675.jpg' },
    @{ keywords = 'personal injury,lawyer,accident'; out='images/articles/personal-injury-1200x675.jpg' },
    @{ keywords = 'criminal defense,lawyer,court'; out='images/articles/criminal-defense-1200x675.jpg' },
    @{ keywords = 'business formation,legal,contract'; out='images/articles/business-formation-1200x675.jpg' },
    @{ keywords = 'mortgage rates,calculator,chart'; out='images/articles/mortgage-refinance-1200x675.jpg' },
    @{ keywords = 'FHA loan,FHA vs conventional,home loan'; out='images/articles/fha-vs-conventional-1200x675.jpg' },
    @{ keywords = 'SBA loan,small business,loan application'; out='images/articles/sba-7a-1200x675.jpg' },
    @{ keywords = 'business line of credit,business credit,laptop'; out='images/articles/line-of-credit-1200x675.jpg' },
    @{ keywords = 'credit report,credit score,credit repair'; out='images/articles/credit-repair-1200x675.jpg' },
    @{ keywords = 'retirement planning,30s,investment'; out='images/articles/retirement-planning-1200x675.jpg' },
    @{ keywords = 'index funds,stock index,investment chart'; out='images/articles/index-funds-1200x675.jpg' },

    @{ keywords = 'author portrait,man,headshot'; out='images/author/abdullah-javed-400x400.jpg'; width=400; height=400 }
)

foreach($item in $images){
    $w = if($item.ContainsKey('width')) { $item.width } else { 1200 }
    $h = if($item.ContainsKey('height')) { $item.height } else { 675 }
    Get-UnsplashImage -keywords $item.keywords -outPath $item.out -width $w -height $h
}

if($ResizeWithImageMagick){
    # Convert JPGs to WebP and create smaller sizes using ImageMagick (magick must be available)
    Write-Host "ImageMagick flag set — creating WebP and resized versions (this may take a while)"
    $sources = Get-ChildItem images -Recurse -Include *.jpg -File
    foreach($s in $sources){
        $base = [System.IO.Path]::GetFileNameWithoutExtension($s.Name)
        $dir = $s.DirectoryName
        $src = $s.FullName
        $webp = Join-Path $dir ($base + '.webp')
        try{
            & magick $src -strip -quality 80 $webp
            Write-Host "Created: $webp"
            # create medium and small sizes for articles
            if($dir -like '*articles*'){
                $med = Join-Path $dir ($base + '-800x450.webp')
                $sm = Join-Path $dir ($base + '-400x225.webp')
                & magick $src -resize 800x450 -strip -quality 80 $med
                & magick $src -resize 400x225 -strip -quality 80 $sm
                Write-Host "Created: $med and $sm"
            }
            if($dir -like '*hero*'){
                $med = Join-Path $dir ($base + '-1200x675.webp')
                & magick $src -strip -quality 80 $med
                Write-Host "Created: $med"
            }
        } catch {
            Write-Warning "ImageMagick conversion failed for $src : $_"
        }
    }
}

Write-Host "Done. Review images in the images/ folder. You may want to verify each image for license and suitability before publishing."
